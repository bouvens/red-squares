import _ from 'lodash'
import * as types from '../constants/actionTypes'
import { DEFAULTS } from '../constants/game'

const initialState = {
    threats: [],
    size: DEFAULTS.threatSize,
    maxSpeed: DEFAULTS.threatSpeed,
    lastTime: 0,
    addTimeout: DEFAULTS.threatAddTimeout,
    index: 0,
    limit: DEFAULTS.threatLimit,
    removeProbability: DEFAULTS.threatRemoveProbability,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_STATE:
            return _.extend({}, state, action.data.threats)
        default:
            return state
    }
}
