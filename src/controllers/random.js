function getRandomCoordinate (range, size) {
  return (Math.random() * (range - (size * 2))) + size
}

let target

export default function randomController (state) {
  if (!target || (state.hero.x === target.x && state.hero.y === target.y)) {
    target = {
      x: getRandomCoordinate(state.game.fieldWidth, state.hero.size),
      y: getRandomCoordinate(state.game.fieldHeight, state.hero.size),
    }
  }

  return target
}
