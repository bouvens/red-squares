export const defaults = {
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

export const gameStatus = {
    play: 'play',
    pause: 'pause',
    stop: 'stop',
}

export const buttonName = {
    [gameStatus.play]: 'Pause',
    [gameStatus.pause]: 'Resume',
    [gameStatus.stop]: 'Start',
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
