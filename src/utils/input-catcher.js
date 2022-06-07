const SPACE = ' '

export const mousePos = {}
const keyPressed = []

window.document.addEventListener('mousemove', (event) => {
  mousePos.x = event.pageX
  mousePos.y = event.pageY
})

window.document.addEventListener('keydown', (event) => {
  if (event.key === SPACE) {
    event.preventDefault()
  }
  keyPressed.push(event.key)
})

export function reactToKeys(keymap = {}) {
  keyPressed.forEach((key) => keymap[key] && keymap[key]())
  keyPressed.length = 0
}
