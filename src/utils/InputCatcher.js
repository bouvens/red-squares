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
        window.document.onkeydown = this.preventing
        window.document.onkeyup = this.saveKeyPressed
    }

    saveMousePos = (e) => {
        InputCatcher.mousePos = {
            x: e.pageX,
            y: e.pageY,
        }
    }

    preventing = (e) => {
        if (e.key === ' ') {
            e.preventDefault()
        }
    }

    saveKeyPressed = ({ key }) => InputCatcher.keyPressed.push(key)

    reactToKeys = (keymap = this.initialKeymap) => {
        InputCatcher.keyPressed.forEach((key) => keymap[key] && keymap[key]())
        InputCatcher.keyPressed = []
    }
}
