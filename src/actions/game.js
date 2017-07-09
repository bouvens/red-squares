import * as types from '../constants/actionTypes'
import { DEFAULTS, GAME_STATUS, HIGHEST_BEATS, SPEEDS } from '../constants/game'
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

const getWaitTime = (state, lastFrameTime) => Math.max(
    lastFrameTime + DEFAULTS.frameLength - performance.now(),
    0
)

const gameCycle = (initState) => {
    const state = gameStateUpdater(initState)

    if (state.game.status === GAME_STATUS.stop && initState.game.status === GAME_STATUS.play) {
        localStorage.setItem(
            HIGHEST_BEATS,
            state.game.highestBeats = Math.max(state.game.beats, state.game.highestBeats)
        )
    }

    return state
}

function updateFrame (dispatch, getState, lastFrameTime) {
    return () => {
        const initState = getState()
        let state = gameCycle(initState)

        if (state.game.speed === SPEEDS.Faster) {
            for (let i = 1; i <= 100; i += 1) {
                state = gameCycle(state)
            }
        }

        if (state.game.status === GAME_STATUS.play || initState.game.status === GAME_STATUS.play) {
            dispatch({
                type: types.SET_STATE,
                data: state,
            })
        }

        setTimeout(
            updateFrame(dispatch, getState, performance.now()),
            state.game.speed === SPEEDS.Normal ? getWaitTime(state, lastFrameTime) : 0
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
