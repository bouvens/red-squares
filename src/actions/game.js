import * as types from '../constants/actionTypes'
import { IDS, HIGHEST_BEATS } from '../constants/game'
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

function updateFrame (dispatch, getState) {
    return () => {
        let data = getState()

        data.game.inputController.reactToKeys({
            ' ': () => {
                data = spacePressAtStart(data)
            }
        })

        data = {
            ...data,
            mousePos: InputCatcher.mousePos,
            field: data.game.redSquares.getFieldSize(),
        }

        data.game.frame += 1
        data = gameDataUpdater(data)

        const waitTime = data.game.startTime + data.game.frameLength * data.game.frame - performance.now()
        if (waitTime < -1000) {
            data.game.frame = Math.floor((performance.now() - data.game.startTime) / data.game.frameLength)
        }

        dispatch({
            type: types.SET_STATE,
            data,
        })

        setTimeout(
            updateFrame(dispatch, getState),
            Math.max(waitTime, 0)
        )
    }
}

export function init (redSquares) {
    return (dispatch, getState) => {
        dispatch({
            type: types.INIT,
            redSquares,
            inputController: new InputCatcher(),
            highestBeats: localStorage[HIGHEST_BEATS] ? parseInt(localStorage[HIGHEST_BEATS], 10) : 0,
        })

        updateFrame(dispatch, getState)()
    }
}

export function setState (name, value) {
    return (dispatch) => {
        switch (name) {
            case IDS.frameLength:
            case IDS.fieldWidth:
            case IDS.fieldHeight:
                dispatch({
                    type: types.SET_STATE,
                    data: {
                        game: {
                            [name]: value
                        },
                    },
                })
                break
            case IDS.heroSize:
                dispatch({
                    type: types.SET_STATE,
                    data: {
                        hero: {
                            size: value
                        },
                    },
                })
                break
            case IDS.threatSize:
                dispatch({
                    type: types.SET_STATE,
                    data: {
                        threats: {
                            size: value
                        },
                    },
                })
                break
            case IDS.threatLimit:
                dispatch({
                    type: types.SET_STATE,
                    data: {
                        threats: {
                            limit: value
                        },
                    },
                })
                break
            case IDS.threatAddTimeout:
                dispatch({
                    type: types.SET_STATE,
                    data: {
                        threats: {
                            addTimeout: value
                        },
                    },
                })
                break
            case IDS.threatRemoveProbability:
                dispatch({
                    type: types.SET_STATE,
                    data: {
                        threats: {
                            removeProbability: value
                        },
                    },
                })
                break
            default:
        }
    }
}
