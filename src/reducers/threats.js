import * as types from '../constants/actionTypes'
import { defaults } from '../constants/game'

const initialState = {
    threats: [],
    size: defaults.threatSize,
    lastTime: 0,
    addTimeout: defaults.threatAddTimeout,
    index: 0,
    limit: defaults.threatLimit,
    removeProbability: defaults.threatRemoveProbability,
    maxSpeed: 4,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.START_NEW:
            return {
                ...state,
                threats: [],
                lastTime: action.lastTime,
            }
        case types.UPDATE_FRAME:
            return {
                ...state,
                threats: action.threats,
                index: state.index + action.added,
                lastTime: action.lastTime,
            }
        case types.SET_THREATS_STATE:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}
