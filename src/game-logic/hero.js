import _ from 'lodash'
import { GAME_STATUS } from '../constants/game'
import { HERO_STATUSES } from '../constants/hero'
import { sign } from '../utils/funcs'

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

    if (Math.sqrt(xDelta ** 2 + yDelta ** 2) <= hero.maxSpeed) {
        return {
            xMove: xDelta,
            yMove: yDelta,
        }
    }

    const xMove = hero.maxSpeed / Math.sqrt(1 + (yDelta ** 2 / xDelta ** 2)) * sign(xDelta)
    const yMove = xDelta ?
        Math.abs(xMove * yDelta / xDelta) * sign(yDelta) :
        hero.maxSpeed

    return {
        xMove,
        yMove,
    }
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

    return _.merge({}, state, {
        game: {
            status: status === HERO_STATUSES.normal ? GAME_STATUS.play : GAME_STATUS.stop,
        },
        hero: {
            x,
            y,
            status,
        }
    })
}
