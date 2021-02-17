import _ from 'lodash'
import * as types from '../constants/actionTypes'
import { DEFAULTS, GAME_STATUS } from '../constants/game'

const initialState = {
  redSquares: null,
  inputController: null,
  manager: DEFAULTS.manager,
  status: GAME_STATUS.stop,
  autoRestart: true,
  beats: 0,
  highestBeats: 0,
  outs: 0,
  frame: 0,
  speed: DEFAULTS.speed,
  fieldWidth: DEFAULTS.fieldWidth,
  fieldHeight: DEFAULTS.fieldHeight,
  error: '',
}

export default function gameController (state = initialState, action) {
  switch (action.type) {
    case types.INIT:
      return _.extend({}, state, action.data)
    case types.SET_STATE:
      return _.extend({}, state, action.data.game)
    default:
      return state
  }
}
