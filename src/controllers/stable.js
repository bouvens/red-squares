import _ from 'lodash'
import { defaultHeroPosition } from '../utils/funcs'
import { getNearest, getSafeInterval, getScaryEdges, getVariants } from './common'

export default function ({ game, hero, threats }) {
  const scaryEdges = getScaryEdges(hero, 2 * threats.size, game.fieldWidth, game.fieldHeight)
  const newThreats = threats.threats.map((threat) => (
    {
      x: threat.x + threat.speed.x,
      y: threat.y + threat.speed.y,
    }
  ))
  const extendedThreats = _.extend(scaryEdges, newThreats)

  const nearestThreat = getNearest(hero, extendedThreats)

  if (!nearestThreat.threat || nearestThreat.distance > getSafeInterval(hero, threats)) {
    return defaultHeroPosition(game, hero.size)
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
