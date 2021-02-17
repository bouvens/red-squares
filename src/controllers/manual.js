import InputCatcher from '../utils/InputCatcher'

export default function manualController (data) {
  const fieldSize = data.game.redSquares.getFieldSize()

  return {
    x: InputCatcher.mousePos.x - fieldSize.left,
    y: InputCatcher.mousePos.y - fieldSize.top,
  }
}
