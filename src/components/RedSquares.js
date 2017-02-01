import React, { Component, PropTypes } from 'react'
import style from './RedSquares.less'
import Field from './Field'
import Square from './Square'

const heroStates = {
    normal: {
        id: 'normal',
        style: style.hero,
    },
    trouble: {
        id: 'trouble',
        style: style.heroInTrouble,
    },
}

export default class RedSquares extends Component {
    /* global performance */
    static propTypes = {
        heroSize: PropTypes.number.isRequired,
        threatSize: PropTypes.number.isRequired,
        threatLimit: PropTypes.number.isRequired,
        threatAddTimeout: PropTypes.number.isRequired,
        threatRemoveProbability: PropTypes.number.isRequired,
    }

    state = {
        hero: {
            x: 0,
            y: 0,
            status: heroStates.normal,
        },
        threats: [],
        threatsIndex: 0,
    }

    static mousePos = {
        x: 0,
        y: 0,
    }

    saveMousePos = (e) => {
        RedSquares.mousePos = {
            x: e.pageX,
            y: e.pageY,
        }
    }

    static keyPressed = {}

    saveKeyPressed = ({ key }) => {
        RedSquares.keyPressed = {
            ...RedSquares.keyPressed,
            [key]: true,
        }
    }

    lastTreatTime = performance.now() - this.props.threatAddTimeout

    componentDidMount () {
        document.onmousemove = this.saveMousePos

        this.saveFieldSize()
        window.onresize = this.saveFieldSize
        window.document.onkeyup = this.saveKeyPressed

        this.startInterval()
    }

    startInterval = () => {
        this.setState({
            interval: setInterval(this.updateFrame, 20)
        })
    }

    updateFrame = () => {
        if (RedSquares.keyPressed.Escape) {
            RedSquares.keyPressed.Escape = false
            this.reset()
            return
        }
        this.moveHero()
        this.moveThreats()
        this.controlThreats()
    }

    reset = () => {
        clearInterval(this.state.interval)
        this.startInterval()
        this.setState({
            threats: [],
        })
    }

    getHeroStatus = () => {
        const { heroSize, threatSize } = this.props
        const safeLength = (heroSize + threatSize) / 2
        const sizeFix = (threatSize - heroSize) / 2
        const hero = this.state.hero

        return this.state.threats.some((threat) =>
            Math.abs(threat.x - hero.x + sizeFix) < safeLength && Math.abs(threat.y - hero.y + sizeFix) < safeLength
        ) ? heroStates.trouble : heroStates.normal
    }

    saveFieldSize = () => {
        const fieldRect = this.field
        // TODO check and browsers and rewrite like https://learn.javascript.ru/coordinates-document
        this.setState({
            field: {
                left: fieldRect.offsetLeft,
                top: fieldRect.offsetTop,
                right: fieldRect.offsetLeft + fieldRect.clientWidth,
                bottom: fieldRect.offsetTop + fieldRect.clientHeight,
                width: fieldRect.clientWidth,
                height: fieldRect.clientHeight,
            }
        })
    }

    moveHero = () => {
        const fieldPos = this.state.field
        let x = Math.max(RedSquares.mousePos.x - this.props.heroSize / 2, fieldPos.left)
        x = Math.min(x, fieldPos.right - this.props.heroSize)
        let y = Math.max(RedSquares.mousePos.y - this.props.heroSize / 2, fieldPos.top)
        y = Math.min(y, fieldPos.bottom - this.props.heroSize)

        this.setState({
            hero: {
                x: x - fieldPos.left,
                y: y - fieldPos.top,
                status: this.getHeroStatus(),
            }
        })
    }

    moveThreats = () => {
        this.setState({
            threats: this.state.threats.map((threat) => (
                {
                    ...threat,
                    x: threat.x + threat.speed.x,
                    y: threat.y + threat.speed.y,
                }
            ))
        })
    }

    processSpeed = (options) => {
        const { size, lean, canFlyAway } = options
        let { speed, isOut } = options
        const isGoingOut = Math.sign(lean) === Math.sign(speed)

        if (!isOut) {
            if (canFlyAway && isGoingOut) {
                isOut = true
            } else {
                speed = (isGoingOut ? -1 : 1) * (speed || 1)
            }
        }

        return {
            speed,
            isOut,
            isAroundField: Math.abs(lean) <= size * 3,
        }
    }

    beat = (field) => (threat) => {
        const { x, y, speed } = threat
        let { isOut, isAroundField } = threat
        const canFlyAway = Math.random() < 1 / this.props.threatRemoveProbability

        if (x < 0) {
            const lean = x
            const processed = this.processSpeed({
                size: this.props.threatSize,
                speed: speed.x,
                lean,
                isOut,
                canFlyAway
            })
            speed.x = processed.speed
            isOut = processed.isOut
            isAroundField = processed.isAroundField
        }
        const rightBorder = field.width - this.props.threatSize
        if (x > rightBorder) {
            const lean = x - rightBorder
            const processed = this.processSpeed({
                size: this.props.threatSize,
                speed: speed.x,
                lean,
                isOut,
                canFlyAway,
            })
            speed.x = processed.speed
            isOut = processed.isOut
            isAroundField = processed.isAroundField
        }

        if (y < 0) {
            const lean = y
            const processed = this.processSpeed({
                size: this.props.threatSize,
                speed: speed.y,
                lean,
                isOut,
                canFlyAway,
            })
            speed.y = processed.speed
            isOut = processed.isOut
            isAroundField = processed.isAroundField
        }
        const bottomBorder = field.height - this.props.threatSize
        if (y >= bottomBorder) {
            const lean = y - bottomBorder
            const processed = this.processSpeed({
                size: this.props.threatSize,
                speed: speed.y,
                lean,
                isOut,
                canFlyAway,
            })
            speed.y = processed.speed
            isOut = processed.isOut
            isAroundField = processed.isAroundField
        }

        return {
            ...threat,
            x,
            y,
            speed,
            isOut,
            isAroundField,
        }
    }

    addThreat = (threats, field) => {
        const size = this.props.threatSize
        let x = Math.round(Math.random() * (field.width - size))
        let y = 0 - size
        let speed = {
            x: Math.round(Math.random() * 8 - 4),
            y: Math.ceil(Math.random() * 4),
        }

        if (Math.random() < 0.5) {
            x = 0 - size
            y = Math.round(Math.random() * (field.height - size))
            speed = {
                x: Math.ceil(Math.random() * 4),
                y: Math.round(Math.random() * 8 - 4),
            }

            if (Math.random() < 0.5) {
                x = field.width
                speed.x = -speed.x
            }
        } else if (Math.random() < 0.5) {
            y = field.height
            speed.y = -speed.y
        }
        threats.push({
            id: this.state.threatsIndex,
            x,
            y,
            speed,
            isOut: false,
            isAroundField: true,
        })

        this.lastTreatTime = performance.now()
        this.setState({
            threats,
            threatsIndex: this.state.threatsIndex + 1,
        })
    }

    controlThreats = () => {
        const field = this.state.field
        let threats = this.state.threats.map(this.beat(field))
        threats = threats.filter((threat) => threat.isAroundField)

        if (threats.length < this.props.threatLimit
            && performance.now() >= this.lastTreatTime + this.props.threatAddTimeout) {
            this.addThreat(threats, field)
        }

        this.setState({
            threats
        })
    }

    render () {
        return (
            <div className={style.wrapper}>
                <Field
                    style={style.field}
                    refHandler={(elem) => { this.field = elem }}
                >
                    <Square
                        style={this.state.hero.status.style}
                        refHandler={(elem) => { this.hero = elem }}
                        size={this.props.heroSize}
                        left={this.state.hero.x}
                        top={this.state.hero.y}
                    />
                    {this.state.threats.map((threat) => (
                        <Square
                            key={threat.id}
                            style={style.threat}
                            size={this.props.threatSize}
                            left={threat.x}
                            top={threat.y}
                        />
                    ))}
                </Field>
                <div className={style.side}>
                    <button onClick={this.reset}>Reset</button>
                    <p>hero.x = {this.state.hero.x}</p>
                    <p>hero.y = {this.state.hero.y}</p>
                    <p>threat.id = {this.state.threats[0] && this.state.threats[0].id}</p>
                    <p>threat.x = {this.state.threats[0] && this.state.threats[0].x}</p>
                    <p>threat.y = {this.state.threats[0] && this.state.threats[0].y}</p>
                    <p>threat.speed.x = {this.state.threats[0] && this.state.threats[0].speed.x}</p>
                    <p>threat.speed.y = {this.state.threats[0] && this.state.threats[0].speed.y}</p>
                    <p>threat.out = {this.state.threats[0] && this.state.threats[0].out ? 'true' : 'false'}</p>
                    <p>threats.length = {this.state.threats.length}</p>
                </div>
            </div>
        )
    }
}
