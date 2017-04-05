import _ from 'lodash'
import * as managers from '../managers'
import { DEFAULTS, GAME_STATUS, KEY_CODES } from '../constants/game'
import { combineProcessors, defaultHeroPosition } from '../utils/funcs'
import { moveHero } from './hero'
import { controlThreats } from './threats'

const statusUpdate = (state, status) => _.merge({}, state, {
    game: {
        status,
    }
})

export function spacePress (state) {
    switch (state.game.status) {
        case GAME_STATUS.play:
            return statusUpdate(state, GAME_STATUS.pause)
        case GAME_STATUS.pause:
            return statusUpdate(state, GAME_STATUS.play)
        case GAME_STATUS.stop:
        default:
            return { // we use spread because of need to rewrite (not merge) threats
                ...state,
                game: {
                    ...state.game,
                    status: GAME_STATUS.play,
                    beats: 0,
                    outs: 0,
                    frame: 0,
                    error: '',
                },
                hero: {
                    ...state.hero,
                    ...defaultHeroPosition,
                },
                threats: {
                    ...state.threats,
                    threats: [],
                    lastTime: 0 - state.threats.addTimeout / DEFAULTS.frameLength,
                },
            }
    }
}

function reactToKeys (oldState) {
    let state = { ...oldState }

    if (state.game.autoRestart && state.game.status === GAME_STATUS.stop) {
        state = spacePress(state)
    } else {
        state.game.inputController.reactToKeys({
            [KEY_CODES.space]: () => {
                state = spacePress(state)
            },
        })
    }

    return state
}

function callManager (oldState) {
    const state = {
        ...oldState,
        target: managers[oldState.game.manager](oldState),
    }
    if (isNaN(state.target.x) || isNaN(state.target.y)) {
        state.game.error = 'Bad target'
        state.target = {
            x: state.hero.x,
            y: state.hero.y,
        }
    }

    return state
}

const nextPlayFrame = combineProcessors(callManager, controlThreats, moveHero)

export function gameStateUpdater (oldState) {
    let state = reactToKeys(oldState)

    if (state.game.status === GAME_STATUS.play) {
        state = nextPlayFrame(state)
        state.game.frame += 1
    }

    return state
}
