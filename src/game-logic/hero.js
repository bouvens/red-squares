import { gameStatus } from '../constants/game'
import { heroStates } from '../constants/hero'

const getHeroStatus = (x, y, heroSize, threatSize, threats) => {
    const safeLength = (heroSize + threatSize) / 2
    const sizeFix = (threatSize - heroSize) / 2

    if (threats.some((threat) =>
            Math.abs(threat.x - x + sizeFix) < safeLength && Math.abs(threat.y - y + sizeFix) < safeLength
        )) {

        return heroStates.trouble
    }

    return heroStates.normal
}

export function moveHero (state) {
    const { mousePos, field, hero } = state
    const { threats } = state.threats
    const threatSize = state.threats.size

    let x = Math.max(mousePos.x - hero.size / 2, field.left)
    x = Math.min(x, field.right - hero.size)
    x -= field.left
    let y = Math.max(mousePos.y - hero.size / 2, field.top)
    y = Math.min(y, field.bottom - hero.size)
    y -= field.top

    const status = getHeroStatus(x, y, hero.size, threatSize, threats)

    return {
        ...state,
        game: {
            ...state.game,
            status: status === heroStates.normal ? gameStatus.play : gameStatus.stop,
            frame: state.game.frame + 1,
        },
        hero: {
            ...hero,
            x,
            y,
            status,
        }
    }
}
