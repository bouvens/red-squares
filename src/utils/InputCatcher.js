export default class InputCatcher {
    static instance
    static mousePos = {}
    static keyPressed = []
    keymap = []

    constructor (keymap) {
        if (InputCatcher.instance) {
            return InputCatcher.instance
        }

        this.keymap = keymap
        InputCatcher.instance = this

        document.onmousemove = this.saveMousePos
        window.document.onkeyup = this.saveKeyPressed
    }

    saveMousePos = (e) => {
        InputCatcher.mousePos = {
            x: e.pageX,
            y: e.pageY,
        }
    }

    saveKeyPressed = ({ key }) => InputCatcher.keyPressed.push(key)

    reactToKeys = () => {
        InputCatcher.keyPressed.forEach((key) => this.keymap[key] && this.keymap[key]())
        InputCatcher.keyPressed = []
    }
}
