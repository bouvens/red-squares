import _ from 'lodash'
import { defaultHeroPosition } from '../utils/funcs'
import { SCARY_INTERVAL, VARIANTS_QUANTITY, getNearest, getScaryEdges } from './common'

function getVariants (hero) {
    const variants = []
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / VARIANTS_QUANTITY) {
        variants.push({
            x: hero.x + Math.cos(angle) * hero.maxSpeed,
            y: hero.y + Math.sin(angle) * hero.maxSpeed,
        })
    }

    return variants
}

export default function ({ game, hero, threats }) {
    const scaryEdges = getScaryEdges(2 * threats.size, game.fieldWidth, game.fieldHeight)
    const newThreats = threats.threats.map((threat) => (
        {
            x: threat.x + threat.speed.x,
            y: threat.y + threat.speed.y,
        }
    ))
    const extendedThreats = _.extend(scaryEdges, newThreats)

    const nearestThreat = getNearest(hero, extendedThreats)

    if (!nearestThreat.threat || nearestThreat.distance > SCARY_INTERVAL * hero.size) {
        return defaultHeroPosition
    }

    const variant = getVariants(hero).reduce((best, current) => {
        const { distance } = getNearest(current, extendedThreats)

        if (distance > best.distance) {
            return {
                x: current.x,
                y: current.y,
                distance,
            }
        }

        return best
    }, {
        x: hero.x,
        y: hero.y,
        distance: nearestThreat.distance,
    })

    return {
        x: variant.x,
        y: variant.y,
    }
}
