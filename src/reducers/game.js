import * as types from '../constants/actionTypes'
import { defaults, gameStatus } from '../constants/game'
import { heroStates } from '../constants/hero'

const initialState = {
    status: gameStatus.stop,
    beats: 0,
    outs: 0,
    frame: 0,
    frameLength: defaults.frameLength, // TODO move to constants when it will defined
    fieldWidth: defaults.fieldWidth,
    fieldHeight: defaults.fieldHeight,
    sideWidth: defaults.sideWidth,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case types.START_NEW:
            return {
                ...state,
                status: gameStatus.play,
                beats: 0,
                outs: 0,
                frame: 0,
            }
        case types.UPDATE_FRAME:
            return {
                ...state,
                status: action.hero.status === heroStates.normal ? gameStatus.play : gameStatus.stop,
                beats: state.beats + action.beats,
                outs: state.outs + action.outs,
                frame: state.frame + 1,
            }
        case types.SET_GAME_STATE:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}
