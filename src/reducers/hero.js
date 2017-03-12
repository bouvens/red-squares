import _ from 'lodash'
import * as types from '../constants/actionTypes'
import { DEFAULTS } from '../constants/game'
import { HERO_STATUSES } from '../constants/hero'

const initialState = {
    x: (DEFAULTS.fieldWidth - DEFAULTS.heroSize) / 2,
    y: (DEFAULTS.fieldHeight - DEFAULTS.heroSize) / 2,
    maxSpeed: DEFAULTS.heroSpeed,
    status: HERO_STATUSES.normal,
    size: DEFAULTS.heroSize,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_STATE:
            return _.extend({}, state, action.data.hero)
        default:
            return state
    }
}
