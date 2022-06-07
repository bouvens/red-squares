import * as types from '../constants/actionTypes'
import { DEFAULTS, GAME_STATUS, SPEEDS } from '../constants/game'
import * as InputCatcher from '../utils/input-catcher'
import { gameStateUpdater, spacePress } from '../game-logic'
import { getHighestScore, removeHighestScore, saveHighestScore } from '../utils/funcs'

export function playPauseGame() {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_STATE,
      data: spacePress(getState()),
    })
  }
}

const getWaitTime = (state, lastFrameTime) => Math.max(
  (lastFrameTime + DEFAULTS.frameLength) - performance.now(),
  0,
)

const gameCycle = (initState) => {
  const state = gameStateUpdater(initState)

  if (state.game.status === GAME_STATUS.stop && initState.game.status === GAME_STATUS.play) {
    state.game.highestScore = Math.max(state.game.score, state.game.highestScore)
    saveHighestScore(state.game.highestScore)
  }

  return state
}

function updateFrame(dispatch, getState, lastFrameTime) {
  return () => {
    const initState = getState()
    let state = gameCycle(initState)

    if (state.game.speed === SPEEDS.Faster) {
      for (let i = 1; i <= 100; i += 1) {
        state = gameCycle(state)
      }
    }

    if (state.game.status === GAME_STATUS.play || initState.game.status === GAME_STATUS.play) {
      dispatch({
        type: types.SET_STATE,
        data: state,
      })
    }

    setTimeout(
      updateFrame(dispatch, getState, performance.now()),
      state.game.speed === SPEEDS.Normal ? getWaitTime(state, lastFrameTime) : 0,
    )
  }
}

export function clearHighest() {
  return (dispatch) => {
    removeHighestScore()

    dispatch({
      type: types.INIT,
      data: {
        highestScore: 0,
      },
    })
  }
}

export function init(redSquares) {
  return (dispatch, getState) => {
    dispatch({
      type: types.INIT,
      data: {
        redSquares,
        inputController: InputCatcher,
        highestScore: getHighestScore(),
      },
    })

    updateFrame(dispatch, getState)()
  }
}
