import _ from 'lodash'
import { GAME_STATUS } from '../constants/game'
import { combineProcessors } from '../utils/funcs'
import { moveHero } from './hero'
import { controlThreats } from './threats'

const statusUpdate = (state, status) => _.merge({}, state, {
    game: {
        status,
    }
})

export function spacePress (state, startTime) {
    switch (state.game.status) {
        case GAME_STATUS.play:
            return statusUpdate(state, GAME_STATUS.pause)
        case GAME_STATUS.pause:
            return statusUpdate(state, GAME_STATUS.play)
        case GAME_STATUS.stop:
        default:
            return { // we use spread because of need of rewrite (not merge) threats
                ...state,
                game: {
                    ...state.game,
                    status: GAME_STATUS.play,
                    beats: 0,
                    outs: 0,
                    frame: 0,
                    startTime,
                },
                threats: {
                    ...state.threats,
                    threats: [],
                    lastTime: 0 - state.threats.addTimeout / state.game.frameLength,
                },
            }
    }
}

const nextPlayFrame = combineProcessors(controlThreats, moveHero)

export function gameDataUpdater (oldData) {
    let data = { ...oldData }

    if (data.game.status === GAME_STATUS.play) {
        data = nextPlayFrame(data)
    }

    return data
}
