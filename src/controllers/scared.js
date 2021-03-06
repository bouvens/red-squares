import _ from 'lodash'
import { defaultHeroPosition } from '../utils/funcs'
import { getNearest, getSafeInterval, getScaryEdges } from './common'

export default function scaredController ({ game, hero, threats }) {
  const scaryEdges = getScaryEdges(hero, 2 * threats.size, game.fieldWidth, game.fieldHeight)

  const nearestThreat = getNearest(hero, _.extend(scaryEdges, threats.threats))

  if (!nearestThreat.threat || nearestThreat.distance > getSafeInterval(hero, threats) * 2) {
    return defaultHeroPosition(game, hero.size)
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
