import { GAME_STATUS } from '../constants/game'
import { HERO_STATUSES } from '../constants/hero'

const getHeroStatus = (x, y, heroSize, threatSize, threats) => {
    const safeLength = heroSize + threatSize

    if (threats.some((threat) =>
            Math.abs(threat.x - x) < safeLength && Math.abs(threat.y - y) < safeLength
        )) {

        return HERO_STATUSES.trouble
    }

    return HERO_STATUSES.normal
}

function getMove (hero, target) {
    const xDelta = target.x - hero.x
    const yDelta = target.y - hero.y
    const distance = Math.sqrt(xDelta ** 2 + yDelta ** 2)

    if (distance <= hero.maxSpeed) {
        return {
            xMove: xDelta,
            yMove: yDelta,
        }
    }

    const normalization = distance / hero.maxSpeed

    return {
        xMove: xDelta / normalization,
        yMove: yDelta / normalization,
    }
}

function getShadows ({ game, hero }) {
    const { shadows } = hero
    let id = 0

    if (!(game.frame % hero.shadowPeriod)) {
        if (shadows.length === hero.shadowQuantity) {
            shadows.pop()
        }
        if (shadows.length) {
            id = shadows[0].id + 1
        }
        shadows.unshift({
            x: hero.x,
            y: hero.y,
            id,
        })
    }

    return shadows
}

export function moveHero (state) {
    const { game, hero, target } = state
    const { threats } = state.threats
    const threatSize = state.threats.size

    const { xMove, yMove } = getMove(hero, target)

    let x = hero.x + xMove
    x = Math.max(x, hero.size)
    x = Math.min(x, game.fieldWidth - hero.size)

    let y = hero.y + yMove
    y = Math.max(y, hero.size)
    y = Math.min(y, game.fieldHeight - hero.size)

    const status = getHeroStatus(x, y, hero.size, threatSize, threats)

    return {
        ...state,
        game: {
            ...state.game,
            status: status === HERO_STATUSES.normal ? GAME_STATUS.play : GAME_STATUS.stop,
        },
        hero: {
            ...state.hero,
            x,
            y,
            status,
            shadows: getShadows(state),
        }
    }
}
