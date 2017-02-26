import * as types from '../constants/actionTypes'
import { defaults } from '../constants/game'
import { heroStates } from '../constants/hero'

const initialState = {
    x: (defaults.fieldWidth - defaults.heroSize) / 2,
    y: (defaults.fieldHeight - defaults.heroSize) / 2,
    status: heroStates.normal,
    size: defaults.heroSize,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_FRAME:
            return {
                ...state,
                ...action.hero,
            }
        case types.SET_HERO_STATE:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}
