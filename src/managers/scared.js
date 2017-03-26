import _ from 'lodash'
import { defaultHeroPosition } from '../utils/funcs'
import { SCARY_INTERVAL, getNearest, getScaryEdges } from './common'

export default function ({ game, hero, threats }) {
    const scaryEdges = getScaryEdges(2 * threats.size, game.fieldWidth, game.fieldHeight)

    const nearestThreat = getNearest(hero, _.extend(scaryEdges, threats.threats))

    if (!nearestThreat.threat || nearestThreat.distance > SCARY_INTERVAL * hero.size) {
        return defaultHeroPosition
    }

    const distance = {
        x: hero.x - nearestThreat.threat.x,
        y: hero.y - nearestThreat.threat.y,
    }

    return {
        x: hero.x + distance.x,
        y: hero.y + distance.y,
    }
}
