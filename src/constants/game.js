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
  manager: 'Traveller',
  heroSize: 25,
  heroSpeed: 10,
  rivalSize: 15,
  rivalSpeed: 4,
  rivalLimit: 20,
  rivalAddTimeout: 1000,
  rivalRemoveProbability: 5,
}

export const IDS = {
  autoRestart: 'game.autoRestart',
  speed: 'game.speed',
  manager: 'game.manager',
  heroSize: 'hero.size',
  heroSpeed: 'hero.maxSpeed',
  rivalSize: 'rivals.size',
  rivalSpeed: 'rivals.maxSpeed',
  rivalLimit: 'rivals.limit',
  rivalAddTimeout: 'rivals.addTimeout',
  rivalRemoveProbability: 'rivals.removeProbability',
}

export const HIGHEST_SCORE = 'highestScore'

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

export const KEYS = {
  space: ' ',
}
