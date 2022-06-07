import { HIGHEST_SCORE } from '../constants/game'

export function isNaNumber (num) {
  return Number.isNaN(parseFloat(num))
}

export function sign (num) {
  if (num === 0 || isNaNumber(num)) {
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
    HIGHEST_SCORE,
    score,
  )
}

export function getHighestScore () {
  const score = localStorage[HIGHEST_SCORE]
  return score ? parseInt(score, 10) : 0
}

export function removeHighestScore () {
  localStorage.removeItem(HIGHEST_SCORE)
}
