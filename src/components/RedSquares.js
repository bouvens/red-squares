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
    static propTypes = {
        frameLength: PropTypes.number.isRequired,
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

    componentDidMount () {
        document.onmousemove = this.saveMousePos

        this.saveFieldSize()
        window.onresize = this.saveFieldSize
        window.document.onkeyup = this.saveKeyPressed

        this.startInterval()
    }

    static mousePos = {
        x: 0,
        y: 0,
    }

    static keyPressed = {}

    frame = 0
    lastTreatTime = 0

    saveMousePos = (e) => {
        RedSquares.mousePos = {
            x: e.pageX,
            y: e.pageY,
        }
    }

    saveKeyPressed = ({ key }) => {
        RedSquares.keyPressed = {
            ...RedSquares.keyPressed,
            [key]: true,
        }
    }

    startInterval = () => {
        this.setState({
            interval: setInterval(this.updateFrame, this.props.frameLength)
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

        this.frame += 1
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

    processSpeed = (oldThreat, size, canFlyAway, options) => {
        const { axis, lean } = options
        const threat = { ...oldThreat }
        const isGoingOut = Math.sign(lean) === Math.sign(threat.speed[axis])

        if (!threat.isOut) {
            if (canFlyAway && isGoingOut) {
                threat.isOut = true
            } else {
                threat.speed[axis] = (isGoingOut ? -1 : 1) * (threat.speed[axis] || 1)
            }
        }
        threat.isAroundField = Math.abs(lean) <= size * 3

        return threat
    }

    beat = (field) => (threat) => {
        let newThreat = { ...threat }
        const canFlyAway = Math.random() < 1 / this.props.threatRemoveProbability
        const processThreat = this.processSpeed.bind(null, newThreat, this.props.threatSize, canFlyAway)

        if (newThreat.x < 0) {
            newThreat = processThreat({
                axis: 'x',
                lean: newThreat.x,
            })
        }
        const rightBorder = field.width - this.props.threatSize
        if (newThreat.x > rightBorder) {
            newThreat = processThreat({
                axis: 'x',
                lean: newThreat.x - rightBorder,
            })
        }

        if (newThreat.y < 0) {
            newThreat = processThreat({
                axis: 'y',
                lean: newThreat.y,
            })
        }
        const bottomBorder = field.height - this.props.threatSize
        if (newThreat.y > bottomBorder) {
            newThreat = processThreat({
                axis: 'y',
                lean: newThreat.y - bottomBorder,
            })
        }

        return newThreat
    }

    addThreat = (field, threats) => {
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

        this.lastTreatTime = this.frame
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
            && this.frame >= this.lastTreatTime + (this.props.threatAddTimeout / this.props.frameLength)) {
            this.addThreat(field, threats)
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
