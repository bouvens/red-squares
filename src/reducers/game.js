import * as types from '../constants/actionTypes'
import { defaults, gameStatus } from '../constants/game'
import { heroStates } from '../constants/hero'

const initialState = {
    redSquares: null,
    inputController: null,
    status: gameStatus.stop,
    beats: 0,
    highestBeats: 0,
    outs: 0,
    frame: 0,
    startTime: 0,
    frameLength: defaults.frameLength, // TODO move to constants when it will defined
    fieldWidth: defaults.fieldWidth,
    fieldHeight: defaults.fieldHeight,
    sideWidth: defaults.sideWidth,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.INIT:
            return {
                ...state,
                redSquares: action.redSquares,
                inputController: action.inputController,
                highestBeats: action.highestBeats,
            }
        case types.UPDATE_FRAME:
            return {
                ...state,
                status: action.hero.status === heroStates.normal ? gameStatus.play : gameStatus.stop,
                beats: state.beats + action.beats,
                outs: state.outs + action.outs,
                frame: state.frame + 1,
            }
        case types.SET_STATE:
            return {
                ...state,
                ...action.data.game,
            }
        default:
            return state
    }
}
