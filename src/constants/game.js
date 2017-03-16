export const HIGHEST_BEATS = 'highestBeats'

export const DEFAULTS = {
    frameLength: 20,
    heroSize: 25,
    heroSpeed: 10,
    threatSize: 15,
    threatSpeed: 4,
    threatLimit: 20,
    threatAddTimeout: 1000,
    threatRemoveProbability: 5,
    fieldWidth: 800,
    fieldHeight: 600,
    sideWidth: 200,
}

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

export const IDS = {
    heroSize: 'hero.size',
    heroSpeed: 'hero.maxSpeed',
    threatSize: 'threats.size',
    threatSpeed: 'threats.maxSpeed',
    threatLimit: 'threats.limit',
    threatAddTimeout: 'threats.addTimeout',
    threatRemoveProbability: 'threats.removeProbability',
}

export const KEY_CODES = {
    space: 32,
}
