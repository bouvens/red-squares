import _ from 'lodash'
import * as managers from '../managers'
import { DEFAULTS, GAME_STATUS, KEY_CODES } from '../constants/game'
import { combineProcessors, defaultHeroPosition } from '../utils/funcs'
import { moveHero } from './hero'
import { controlThreats } from './threats'

const statusUpdate = (data, status) => _.merge({}, data, {
    game: {
        status,
    }
})

export function spacePress (data) {
    switch (data.game.status) {
        case GAME_STATUS.play:
            return statusUpdate(data, GAME_STATUS.pause)
        case GAME_STATUS.pause:
            return statusUpdate(data, GAME_STATUS.play)
        case GAME_STATUS.stop:
        default:
            return { // we use spread because of need to rewrite (not merge) threats
                ...data,
                game: {
                    ...data.game,
                    status: GAME_STATUS.play,
                    beats: 0,
                    outs: 0,
                    frame: 0,
                    error: '',
                },
                hero: {
                    ...data.hero,
                    ...defaultHeroPosition,
                },
                threats: {
                    ...data.threats,
                    threats: [],
                    lastTime: 0 - data.threats.addTimeout / DEFAULTS.frameLength,
                },
            }
    }
}

function reactToKeys (oldData) {
    let data = { ...oldData }

    if (data.game.autoRestart && data.game.status === GAME_STATUS.stop) {
        data = spacePress(data)
    } else {
        data.game.inputController.reactToKeys({
            [KEY_CODES.space]: () => {
                data = spacePress(data)
            },
        })
    }

    return data
}

function callManager (oldData) {
    const data = {
        ...oldData,
        target: managers[oldData.game.manager](oldData),
    }
    if (isNaN(data.target.x) || isNaN(data.target.y)) {
        data.game.error = 'Bad target'
        data.target = {
            x: data.hero.x,
            y: data.hero.y,
        }
    }

    return data
}

const nextPlayFrame = combineProcessors(callManager, controlThreats, moveHero)

export function gameDataUpdater (oldData) {
    let data = reactToKeys(oldData)

    if (data.game.status === GAME_STATUS.play) {
        data = nextPlayFrame(data)
        data.game.frame += 1
    }

    return data
}
