import * as types from '../constants/actionTypes'
import { DEFAULTS, GAME_STATUS, HIGHEST_BEATS } from '../constants/game'
import InputCatcher from '../utils/InputCatcher'
import { gameDataUpdater, spacePress } from '../game-logic'

export function processSpacePress () {
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_STATE,
            data: spacePress(getState()),
        })
    }
}

function updateFrame (dispatch, getState) {
    return () => {
        const data = gameDataUpdater(getState())

        const waitTime = data.game.frameTime + DEFAULTS.frameLength - performance.now()
        const isPreviouslyPlayed = getState().game.status === GAME_STATUS.play

        if (data.game.status === GAME_STATUS.stop && isPreviouslyPlayed) {
            localStorage.setItem(
                HIGHEST_BEATS,
                data.game.highestBeats = Math.max(data.game.beats, data.game.highestBeats)
            )
        }

        data.game.frameTime = performance.now()
        if (data.game.status === GAME_STATUS.play || isPreviouslyPlayed) {
            dispatch({
                type: types.SET_STATE,
                data,
            })
        }

        setTimeout(
            updateFrame(dispatch, getState),
            data.game.normalSpeed ? Math.max(waitTime, 0) : 0
        )
    }
}

export function clearHighest () {
    return (dispatch) => {
        localStorage.removeItem(HIGHEST_BEATS)

        dispatch({
            type: types.INIT,
            data: {
                highestBeats: 0,
            },
        })
    }
}

export function init (redSquares) {
    return (dispatch, getState) => {
        dispatch({
            type: types.INIT,
            data: {
                redSquares,
                inputController: new InputCatcher(),
                highestBeats: localStorage[HIGHEST_BEATS] ? parseInt(localStorage[HIGHEST_BEATS], 10) : 0,
            },
        })

        updateFrame(dispatch, getState)()
    }
}
