import _ from 'lodash'
import { GAME_STATUS } from '../constants/game'
import { HERO_STATUSES } from '../constants/hero'

const getHeroStatus = (x, y, heroSize, threatSize, threats) => {
    const safeLength = (heroSize + threatSize) / 2
    const sizeFix = (threatSize - heroSize) / 2

    if (threats.some((threat) =>
            Math.abs(threat.x - x + sizeFix) < safeLength && Math.abs(threat.y - y + sizeFix) < safeLength
        )) {

        return HERO_STATUSES.trouble
    }

    return HERO_STATUSES.normal
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
