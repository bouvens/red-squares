import * as types from '../constants/actionTypes'
import { gameStatus, IDS } from '../constants/game'
import { controlThreats } from '../game-logic/threats'
import { moveHero } from '../game-logic/hero'

export function processSpacePress () {
    return (dispatch, getState) => {
        switch (getState().game.status) {
            case gameStatus.play:
                dispatch({
                    type: types.SET_STATUS,
                    status: gameStatus.pause,
                })
                break
            case gameStatus.pause:
                dispatch({
                    type: types.SET_STATUS,
                    status: gameStatus.play,
                })
                break
            case gameStatus.stop:
            default:
                dispatch({
                    type: types.START_NEW,
                    lastTime: 0 - getState().threats.addTimeout / getState().game.frameLength,
                })
        }
    }
}

export function updateFrame (mousePos, field) {
    return (dispatch, getState) => {
        const state = getState()

        if (state.game.status === gameStatus.play) {
            const controlled = controlThreats(
                state.threats.threats,
                state.threats.removeProbability,
                state.threats.limit,
                state.game.frame,
                state.threats.lastTime,
                state.threats.addTimeout,
                state.game.frameLength,
                state.threats.size,
                state.threats.index,
                state.game.fieldWidth,
                state.game.fieldHeight,
                state.threats.maxSpeed,
            )
            dispatch({
                type: types.UPDATE_FRAME,
                ...controlled,
                ...moveHero(
                    mousePos,
                    field,
                    state.hero.size,
                    state.threats.size,
                    controlled.threats,
                ),
            })
        }
    }
}

export function setState (name, value) {
    return (dispatch) => {
        switch (name) {
            case IDS.frameLength:
            case IDS.fieldWidth:
            case IDS.fieldHeight:
                dispatch({
                    type: types.SET_GAME_STATE,
                    data: {
                        [name]: value,
                    },
                })
                break
            case IDS.heroSize:
                dispatch({
                    type: types.SET_HERO_STATE,
                    data: {
                        size: value,
                    },
                })
                break
            case IDS.threatSize:
                dispatch({
                    type: types.SET_THREATS_STATE,
                    data: {
                        size: value,
                    },
                })
                break
            case IDS.threatLimit:
                dispatch({
                    type: types.SET_THREATS_STATE,
                    data: {
                        limit: value,
                    },
                })
                break
            case IDS.threatAddTimeout:
                dispatch({
                    type: types.SET_THREATS_STATE,
                    data: {
                        addTimeout: value,
                    },
                })
                break
            case IDS.threatRemoveProbability:
                dispatch({
                    type: types.SET_THREATS_STATE,
                    data: {
                        removeProbability: value,
                    },
                })
                break
            default:
        }
    }
}
