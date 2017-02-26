import * as types from '../constants/actionTypes'
import { gameStatus, IDS } from '../constants/game'
import { controlThreats } from '../game-logic/threats'
import { moveHero } from '../game-logic/hero'
import { combineProcessors } from '../utils/funcs'

export function processSpacePress () {
    return (dispatch, getState) => {
        switch (getState().game.status) {
            case gameStatus.play:
                dispatch({
                    type: types.SET_STATUS,
                    status: gameStatus.pause,
                })
                break
            case gameStatus.pause:
                dispatch({
                    type: types.SET_STATUS,
                    status: gameStatus.play,
                })
                break
            case gameStatus.stop:
            default:
                dispatch({
                    type: types.START_NEW,
                    lastTime: 0 - getState().threats.addTimeout / getState().game.frameLength,
                })
        }
    }
}

const nextFrame = combineProcessors(controlThreats, moveHero)

export function updateFrame (mousePos, field) {
    return (dispatch, getState) => {
        const state = getState()

        if (state.game.status === gameStatus.play) {
            dispatch({
                type: types.SET_STATE,
                data: nextFrame({
                    ...state,
                    mousePos,
                    field,
                }),
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
