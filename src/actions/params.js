import * as types from '../constants/actionTypes'
import { IDS } from '../constants/game'

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
