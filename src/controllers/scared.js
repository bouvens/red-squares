import _ from 'lodash'
import { defaultHeroPosition } from '../utils/funcs'
import { getNearest, getSafeInterval, getScaryEdges } from './common'

export default function scaredController({ game, hero, rivals }) {
  const scaryEdges = getScaryEdges(hero, 2 * rivals.size, game.fieldWidth, game.fieldHeight)

  const nearestRival = getNearest(hero, _.extend(scaryEdges, rivals.rivals))

  if (!nearestRival.rival || nearestRival.distance > getSafeInterval(hero, rivals) * 2) {
    return defaultHeroPosition(game, hero.size)
  }

  const distance = {
    x: hero.x - nearestRival.rival.x,
    y: hero.y - nearestRival.rival.y,
  }

  return {
    x: hero.x + distance.x,
    y: hero.y + distance.y,
  }
}
