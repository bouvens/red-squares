import * as types from '../constants/actionTypes'
import { gameStatus, IDS, HIGHEST_BEATS } from '../constants/game'
import InputCatcher from '../utils/InputCatcher'
import { combineProcessors } from '../utils/funcs'
import { spacePress, moveHero, controlThreats } from '../game-logic'

export function processSpacePress () {
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_STATE,
            data: spacePress(getState()),
        })
    }
}

export function init () {
    return (dispatch) => {
        dispatch({
            type: types.INIT,
            inputController: new InputCatcher(),
            highestBeats: localStorage[HIGHEST_BEATS] ? parseInt(localStorage[HIGHEST_BEATS], 10) : 0,
        })
    }
}

const nextFrame = combineProcessors(controlThreats, moveHero)

export function updateFrame (field) {
    return (dispatch, getState) => {
        let data = getState()

        data.game.inputController.reactToKeys({
            ' ': () => {
                data = spacePress(data)
            }
        })

        if (data.game.status === gameStatus.play) {
            data = nextFrame({
                ...data,
                mousePos: InputCatcher.mousePos,
                field,
            })

            if (data.game.status === gameStatus.stop) {
                localStorage.setItem(
                    HIGHEST_BEATS,
                    data.game.highestBeats = Math.max(data.game.beats, data.game.highestBeats)
                )
            }

            dispatch({
                type: types.SET_STATE,
                data,
            })
        } else {
            dispatch({
                type: types.SET_STATE,
                data,
            })
        }
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
