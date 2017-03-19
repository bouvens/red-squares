import { DEFAULTS } from '../constants/game'

export function combineProcessors (...processors) {
    return (state) => processors.reduce((result, processor) => processor(result), state)
}

export function sign (num) {
    if (num === 0 || isNaN(num)) {
        return num
    }

    return num > 0 ? 1 : -1
}

export const defaultHeroPosition = {
    x: (DEFAULTS.fieldWidth - DEFAULTS.heroSize) / 2,
    y: (DEFAULTS.fieldHeight - DEFAULTS.heroSize) / 2,
}
