import { GAME_STATUS } from '../constants/game'
import { HERO_STATUSES } from '../constants/hero'

const getHeroStatus = (x, y, heroSize, rivalSize, rivals) => {
  const safeLength = heroSize + rivalSize

  if (rivals.some(
    (rival) => Math.abs(rival.x - x) < safeLength && Math.abs(rival.y - y) < safeLength,
  )) {
    return HERO_STATUSES.trouble
  }

  return HERO_STATUSES.normal
}

function getMove(hero, target) {
  const xDelta = target.x - hero.x
  const yDelta = target.y - hero.y
  const distance = Math.sqrt((xDelta ** 2) + (yDelta ** 2))

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

function getShadows({ game, hero: { shadows, shadowPeriod, shadowQuantity, x, y } }) {
  if (!(game.frame % shadowPeriod)) {
    if (shadows.length === shadowQuantity) {
      shadows.pop()
    }

    shadows.unshift({
      x,
      y,
      id: shadows.length ? shadows[0].id + 1 : 0,
    })
  }

  return shadows
}

export function moveHero(state) {
  const { game, hero, rivals: { rivals } } = state
  const rivalSize = state.rivals.size

  const { xMove, yMove } = getMove(hero, hero.target)

  let x = hero.x + xMove
  x = Math.max(x, hero.size)
  x = Math.min(x, game.fieldWidth - hero.size)

  let y = hero.y + yMove
  y = Math.max(y, hero.size)
  y = Math.min(y, game.fieldHeight - hero.size)

  const status = getHeroStatus(x, y, hero.size, rivalSize, rivals)

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
    },
  }
}
