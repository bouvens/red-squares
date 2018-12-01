export default function (state) {
  return state.hero
    ? {
      x: state.hero.x,
      y: state.hero.y,
    }
    : {
      x: 0,
      y: 0,
    }
}
