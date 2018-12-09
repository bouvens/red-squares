const SPACE = ' '

export default class InputCatcher {
  static instance

  static mousePos = {}

  static keyPressed = []

  initialKeymap = {}

  constructor (keymap) {
    this.initialKeymap = keymap

    if (InputCatcher.instance) {
      return InputCatcher.instance
    }
    InputCatcher.instance = this

    document.onmousemove = this.saveMousePos
    window.document.addEventListener('keydown', this.process)
  }

  saveMousePos = (e) => {
    InputCatcher.mousePos = {
      x: e.pageX,
      y: e.pageY,
    }
  }

  process = (e) => {
    if (e.key === SPACE) {
      e.preventDefault()
    }
    this.saveKeyPressed(e)
  }

  saveKeyPressed = ({ keyCode }) => {
    InputCatcher.keyPressed.push(keyCode)
  }

  reactToKeys = (keymap = this.initialKeymap) => {
    InputCatcher.keyPressed.forEach((key) => keymap[key] && keymap[key]())
    InputCatcher.keyPressed = []
  }
}
