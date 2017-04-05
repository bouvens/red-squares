import * as types from '../constants/actionTypes'
import { DEFAULTS, GAME_STATUS, HIGHEST_BEATS } from '../constants/game'
import InputCatcher from '../utils/InputCatcher'
import { gameStateUpdater, spacePress } from '../game-logic'

export function processSpacePress () {
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_STATE,
            data: spacePress(getState()),
        })
    }
}

const getWaitTime = (state) => Math.max(
    state.game.frameTime + DEFAULTS.frameLength - performance.now(),
    0
)

function updateFrame (dispatch, getState) {
    return () => {
        const initState = getState()
        const state = gameStateUpdater(initState)

        const isPreviouslyPlayed = initState.game.status === GAME_STATUS.play

        if (state.game.status === GAME_STATUS.stop && isPreviouslyPlayed) {
            localStorage.setItem(
                HIGHEST_BEATS,
                state.game.highestBeats = Math.max(state.game.beats, state.game.highestBeats)
            )
        }

        if (state.game.status === GAME_STATUS.play || isPreviouslyPlayed) {
            dispatch({
                type: types.SET_STATE,
                data: state,
            })
        }

        if (state.game.normalSpeed) {
            state.game.frameTime = performance.now()
            setTimeout(
                updateFrame(dispatch, getState),
                getWaitTime(state)
            )
        } else {
            setTimeout(
                updateFrame(dispatch, getState),
                0
            )
        }
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
