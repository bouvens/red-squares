import _ from 'lodash'
import * as types from '../constants/actionTypes'
import * as managers from '../managers'
import { DEFAULTS, GAME_STATUS } from '../constants/game'

const initialState = {
    redSquares: null,
    inputController: null,
    manager: _.findKey(managers, (f) => f === managers.Agile),
    status: GAME_STATUS.stop,
    beats: 0,
    highestBeats: 0,
    outs: 0,
    frame: 0,
    startTime: 0,
    fieldWidth: DEFAULTS.fieldWidth,
    fieldHeight: DEFAULTS.fieldHeight,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.INIT:
            return _.extend({}, state, action.data)
        case types.SET_STATE:
            return _.extend({}, state, action.data.game)
        default:
            return state
    }
}
