import _ from 'lodash'
import * as managers from '../controllers'

export const SPEEDS = {
  Normal: 'Normal',
  Fast: 'Fast',
  Faster: 'Faster',
}

export const DEFAULTS = {
  frameLength: 30,
  fieldWidth: 800,
  fieldHeight: 600,
  sideWidth: 200,
  shadowPeriod: 1,
  shadowQuantity: 50,
  speed: SPEEDS.Fast,
  manager: _.findKey(managers, (f) => f === managers.Traveller),
  heroSize: 25,
  heroSpeed: 10,
  threatSize: 15,
  threatSpeed: 4,
  threatLimit: 20,
  threatAddTimeout: 1000,
  threatRemoveProbability: 5,
}

export const IDS = {
  autoRestart: 'game.autoRestart',
  speed: 'game.speed',
  manager: 'game.manager',
  heroSize: 'hero.size',
  heroSpeed: 'hero.maxSpeed',
  threatSize: 'threats.size',
  threatSpeed: 'threats.maxSpeed',
  threatLimit: 'threats.limit',
  threatAddTimeout: 'threats.addTimeout',
  threatRemoveProbability: 'threats.removeProbability',
}

export const HIGHEST_BEATS = 'highestBeats'

export const GAME_STATUS = {
  play: 'play',
  pause: 'pause',
  stop: 'stop',
}

export const BUTTON_NAMES = {
  [GAME_STATUS.play]: 'Pause',
  [GAME_STATUS.pause]: 'Resume',
  [GAME_STATUS.stop]: 'Start',
}

export const KEY_CODES = {
  space: 32,
}
