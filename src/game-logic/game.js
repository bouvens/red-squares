import { gameStatus, HIGHEST_BEATS } from '../constants/game'
import { combineProcessors } from '../utils/funcs'
import InputCatcher from '../utils/InputCatcher'
import { moveHero } from './hero'
import { controlThreats } from './threats'

const statusHandler = (state, status) => ({
    ...state,
    game: {
        ...state.game,
        status
    }
})

export function spacePress (state, startTime) {
    switch (state.game.status) {
        case gameStatus.play:
            return statusHandler(state, gameStatus.pause)
        case gameStatus.pause:
            return statusHandler(state, gameStatus.play)
        case gameStatus.stop:
        default:
            return {
                ...state,
                game: {
                    ...state.game,
                    status: gameStatus.play,
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
    let data = oldData

    if (data.game.status === gameStatus.play) {
        data = nextPlayFrame(data)

        if (data.game.status === gameStatus.stop) {
            localStorage.setItem(
                HIGHEST_BEATS,
                data.game.highestBeats = Math.max(data.game.beats, data.game.highestBeats)
            )
        }
    }

    return data
}
