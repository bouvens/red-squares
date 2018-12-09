import { HIGHEST_BEATS } from '../constants/game'

export function combineProcessors (...processors) {
  return (state) => processors.reduce((result, processor) => processor(result), state)
}

export function sign (num) {
  if (num === 0 || isNaN(num)) {
    return num
  }

  return num > 0 ? 1 : -1
}

export const defaultHeroPosition = (game, size) => ({
  x: (game.fieldWidth - size) / 2,
  y: (game.fieldHeight - size) / 2,
})

export function saveHighestScore (score) {
  localStorage.setItem(
    HIGHEST_BEATS,
    score,
  )
}

export function getHighestScore () {
  const score = localStorage[HIGHEST_BEATS]
  return score ? parseInt(score, 10) : 0
}

export function removeHighestScore () {
  localStorage.removeItem(HIGHEST_BEATS)
}
