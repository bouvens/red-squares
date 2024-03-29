import * as InputCatcher from '../utils/input-catcher'

export default function manualController(data) {
  const fieldSize = data.game.redSquares.getFieldSize()

  return {
    x: InputCatcher.mousePos.x - fieldSize.left,
    y: InputCatcher.mousePos.y - fieldSize.top,
  }
}
