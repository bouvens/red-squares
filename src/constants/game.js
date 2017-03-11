export const HIGHEST_BEATS = 'highestBeats'

export const DEFAULTS = {
    frameLength: 20,
    heroSize: 50,
    threatSize: 30,
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
    frameLength: 'frameLength',
    heroSize: 'heroSize',
    threatSize: 'threatSize',
    threatLimit: 'threatLimit',
    threatAddTimeout: 'threatAddTimeout',
    threatRemoveProbability: 'threatRemoveProbability',
    fieldWidth: 'fieldWidth',
    fieldHeight: 'fieldHeight',
}
