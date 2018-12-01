import _ from 'lodash'
import * as types from '../constants/actionTypes'
import { DEFAULTS } from '../constants/game'
import { HERO_STATUSES } from '../constants/hero'
import { defaultHeroPosition } from '../utils/funcs'

const initialState = {
  ...defaultHeroPosition(DEFAULTS, DEFAULTS.heroSize),
  maxSpeed: DEFAULTS.heroSpeed,
  status: HERO_STATUSES.normal,
  size: DEFAULTS.heroSize,
  shadowPeriod: DEFAULTS.shadowPeriod,
  shadowQuantity: DEFAULTS.shadowQuantity,
  shadows: [],
  target: {
    ...defaultHeroPosition(DEFAULTS, DEFAULTS.heroSize),
    save: '',
  },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_STATE:
      return _.extend({}, state, action.data.hero)
    default:
      return state
  }
}
