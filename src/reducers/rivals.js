import _ from 'lodash'
import * as types from '../constants/actionTypes'
import { DEFAULTS } from '../constants/game'

const initialState = {
  rivals: [],
  size: DEFAULTS.rivalSize,
  maxSpeed: DEFAULTS.rivalSpeed,
  lastTime: 0,
  addTimeout: DEFAULTS.rivalAddTimeout,
  index: 0,
  limit: DEFAULTS.rivalLimit,
  removeProbability: DEFAULTS.rivalRemoveProbability,
}

export default function rivalsController (state = initialState, action) {
  switch (action.type) {
    case types.SET_STATE:
      return _.extend({}, state, action.data.rivals)
    default:
      return state
  }
}
