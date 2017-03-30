import * as types from '../constants/actionTypes'
import { HIGHEST_BEATS, GAME_STATUS, DEFAULTS, KEY_CODES } from '../constants/game'
import InputCatcher from '../utils/InputCatcher'
import * as managers from '../managers'
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

function updateFrame (dispatch, getState) {
    return () => {
        let data = getState()

        data.game.inputController.reactToKeys({
            [KEY_CODES.space]: () => {
                data = spacePressAtStart(data)
            },
        })

        data = {
            ...data,
            target: managers[data.game.manager](data),
        }
        if (isNaN(data.target.x) || isNaN(data.target.y)) {
            data.game.error = 'Bad target'
            data.target = {
                x: data.hero.x,
                y: data.hero.y,
            }
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
