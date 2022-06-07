import _ from 'lodash'
import { defaultHeroPosition } from '../utils/funcs'
import { getNearest, getSafeInterval, getScaryEdges, getVariants } from './common'

export default function stableController ({ game, hero, rivals }) {
  const scaryEdges = getScaryEdges(hero, 2 * rivals.size, game.fieldWidth, game.fieldHeight)
  const newRivals = rivals.rivals.map((rival) => (
    {
      x: rival.x + rival.speed.x,
      y: rival.y + rival.speed.y,
    }
  ))
  const extendedRivals = _.extend(scaryEdges, newRivals)

  const nearestRival = getNearest(hero, extendedRivals)

  if (!nearestRival.rival || nearestRival.distance > getSafeInterval(hero, rivals)) {
    return defaultHeroPosition(game, hero.size)
  }

  const variant = getVariants(hero).reduce((best, current) => {
    const { distance } = getNearest(current, extendedRivals)

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
    distance: nearestRival.distance,
  })

  return {
    x: variant.x,
    y: variant.y,
  }
}
