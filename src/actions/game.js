import * as types from '../constants/actionTypes'
import { HIGHEST_BEATS, GAME_STATUS, DEFAULTS, KEY_CODES } from '../constants/game'
import InputCatcher from '../utils/InputCatcher'
import { spacePress, gameDataUpdater } from '../game-logic'

const spacePressAtStart = (state) => spacePress(state, performance.now())

export function processSpacePress () {
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_STATE,
            data: spacePressAtStart(getState()),
        })
    }
}

let minWaitTime = Infinity

function updateFrame (dispatch, getState) {
    return () => {
        let data = getState()

        data.game.inputController.reactToKeys({
            [KEY_CODES.space]: () => {
                data = spacePressAtStart(data)
            },
        })

        const fieldSize = data.game.redSquares.getFieldSize()
        data = {
            ...data,
            target: {
                x: InputCatcher.mousePos.x - fieldSize.left,
                y: InputCatcher.mousePos.y - fieldSize.top,
            },
        }

        data.game.frame += 1
        data = gameDataUpdater(data)

        const waitTime = data.game.startTime + DEFAULTS.frameLength * data.game.frame - performance.now()
        if (waitTime < -1000) {
            data.game.frame = Math.floor((performance.now() - data.game.startTime) / DEFAULTS.frameLength)
        }

        if (data.game.status === GAME_STATUS.stop && getState().game.status === GAME_STATUS.play) {
            localStorage.setItem(
                HIGHEST_BEATS,
                data.game.highestBeats = Math.max(data.game.beats, data.game.highestBeats)
            )
        }

        if (data.game.status === GAME_STATUS.play || getState().game.status === GAME_STATUS.play) {
            dispatch({
                type: types.SET_STATE,
                data,
            })
        }

        if (waitTime > 0 && waitTime < minWaitTime) {
            minWaitTime = waitTime
            console.log(waitTime)
        }

        setTimeout(
            updateFrame(dispatch, getState),
            Math.max(waitTime, 0)
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
