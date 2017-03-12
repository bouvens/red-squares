import _ from 'lodash'
import * as types from '../constants/actionTypes'
import { DEFAULTS, GAME_STATUS } from '../constants/game'

const initialState = {
    redSquares: null,
    inputController: null,
    status: GAME_STATUS.stop,
    beats: 0,
    highestBeats: 0,
    outs: 0,
    frame: 0,
    startTime: 0,
    frameLength: DEFAULTS.frameLength, // TODO move to constants when it will defined
    fieldWidth: DEFAULTS.fieldWidth,
    fieldHeight: DEFAULTS.fieldHeight,
    sideWidth: DEFAULTS.sideWidth,
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
