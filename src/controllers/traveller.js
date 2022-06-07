import { getNearest, getSafeInterval, getVariants } from './common'

const setupMinDistance = (fieldWidth, fieldHeight, safe) => ({ x, y }, rivals) => Math.min(
  getNearest({ x, y }, rivals).distance,
  x + safe,
  (fieldWidth + safe) - x,
  y + safe,
  (fieldHeight + safe) - y,
)

function getClearest(safe, fieldWidth, fieldHeight, rivals) {
  let clearest = 0
  let xBest
  let yBest
  const getMinDistance = setupMinDistance(fieldWidth, fieldHeight, safe)

  for (let x = safe; x < fieldWidth - safe; x += safe) {
    for (let y = safe; y < fieldHeight - safe; y += safe) {
      const distance = getMinDistance({ x, y }, rivals)

      if (distance > clearest) {
        clearest = distance
        xBest = x
        yBest = y
      }
    }
  }

  return {
    x: xBest,
    y: yBest,
  }
}

export default function travellerController({ game, hero, rivals }) {
  const newRivals = rivals.rivals.map((rival) => ({
    x: rival.x + rival.speed.x,
    y: rival.y + rival.speed.y,
  }))

  const safe = hero.size + rivals.size
  const getMinDistance = setupMinDistance(game.fieldWidth, game.fieldHeight, safe)
  const nearest = getMinDistance(hero, newRivals)

  if (nearest > getSafeInterval(hero, rivals)) {
    return getClearest(safe, game.fieldWidth, game.fieldHeight, newRivals)
  }

  const variant = getVariants(hero).reduce((best, current) => {
    const distance = getMinDistance(current, newRivals)

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
    distance: nearest,
  })

  return {
    x: variant.x,
    y: variant.y,
  }
}
