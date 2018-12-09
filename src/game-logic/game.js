import _ from 'lodash'
import { compose } from 'redux'
import * as managers from '../controllers'
import { DEFAULTS, GAME_STATUS, KEY_CODES } from '../constants/game'
import { defaultHeroPosition, isNaNumber } from '../utils/funcs'
import { moveHero } from './hero'
import { controlThreats } from './threats'

const statusUpdate = (state, status) => _.merge({}, state, {
  game: {
    status,
  },
})

export function spacePress (state) {
  switch (state.game.status) {
    case GAME_STATUS.play:
      return statusUpdate(state, GAME_STATUS.pause)
    case GAME_STATUS.pause:
      return statusUpdate(state, GAME_STATUS.play)
    case GAME_STATUS.stop:
    default:
      // we use spread because of need to rewrite (not merge) threats
      return {
        ...state,
        game: {
          ...state.game,
          status: GAME_STATUS.play,
          beats: 0,
          outs: 0,
          frame: 0,
          error: '',
        },
        hero: {
          ...state.hero,
          ...defaultHeroPosition(state.game, state.hero.size),
        },
        threats: {
          ...state.threats,
          threats: [],
          lastTime: -state.threats.addTimeout / DEFAULTS.frameLength,
        },
      }
  }
}

function callManager (oldState) {
  const state = _.merge({}, oldState, {
    hero: {
      target: managers[oldState.game.manager](oldState),
    },
  })
  if (isNaNumber(state.hero.target.x) || isNaNumber(state.hero.target.y)) {
    state.game.error = 'Bad target'
    state.hero.target = {
      ...state.hero.target,
      x: state.hero.x,
      y: state.hero.y,
    }
  }

  return state
}

function reactToKeys (oldState) {
  let state = { ...oldState }

  if (state.game.status === GAME_STATUS.stop && state.game.autoRestart) {
    state = callManager(state)
    state = spacePress(state)
  } else {
    state.game.inputController.reactToKeys({
      [KEY_CODES.space]: () => {
        state = spacePress(state)
      },
    })
  }

  return state
}

const nextPlayFrame = compose(controlThreats, callManager, moveHero)

export function gameStateUpdater (oldState) {
  let state = reactToKeys(oldState)

  if (state.game.status === GAME_STATUS.play) {
    state = nextPlayFrame(state)
    state.game.frame += 1
  }

  return state
}
