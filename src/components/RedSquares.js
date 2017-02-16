import React, { Component, PropTypes } from 'react'
import style from './RedSquares.less'
import Field from './Field'
import Square from './Square'
import StateControl from './StateControl'

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

const STATUS = {
    play: 'play',
    pause: 'pause',
    stop: 'stop',
}

export default class RedSquares extends Component {
    static propTypes = {
        defaults: PropTypes.objectOf(PropTypes.number).isRequired,
    }

    state = {
        status: STATUS.stop,
        hero: {
            x: 0,
            y: 0,
            status: heroStates.normal,
        },
        threats: [],
        beats: 0,
        outs: 0,
        frameLength: this.props.defaults.frameLength,
        heroSize: this.props.defaults.heroSize,
        threatSize: this.props.defaults.threatSize,
        threatLimit: this.props.defaults.threatLimit,
        threatAddTimeout: this.props.defaults.threatAddTimeout,
        threatRemoveProbability: this.props.defaults.threatRemoveProbability,
        fieldWidth: 640,
        fieldHeight: 480,
    }

    componentDidMount () {
        document.onmousemove = this.saveMousePos

        this.saveFieldSize()
        window.onresize = this.saveFieldSize
        setTimeout(() => this.setState({
            hero: {
                ...this.state.hero,
                x: (this.field.clientWidth - this.state.heroSize) / 2,
                y: (this.field.clientHeight - this.state.heroSize) / 2,
            }
        }), 0)
        window.document.onkeyup = this.saveKeyPressed

        this.startInterval()
    }

    static mousePos = {
        x: 0,
        y: 0,
    }

    keyPressed = []

    saveMousePos = (e) => {
        RedSquares.mousePos = {
            x: e.pageX,
            y: e.pageY,
        }
    }

    saveKeyPressed = ({ key }) => this.keyPressed.push(key)

    buttonPressProceed = () => {
        switch (this.state.status) {
            case STATUS.play:
                this.setState({
                    status: STATUS.pause,
                })
                break
            case STATUS.pause:
                this.setState({
                    status: STATUS.play,
                })
                break
            case STATUS.stop:
            default:
                this.setState({
                    status: STATUS.play,
                })
                this.frame = 0
                this.lastTreatTime = 0 - (this.state.threatAddTimeout / this.state.frameLength)
                clearInterval(this.interval)
                this.startInterval()
                this.setState({
                    threats: [],
                    beats: 0,
                })
        }
    }

    getButtonName = () => {
        switch (this.state.status) {
            case STATUS.play:
                return 'Pause'
            case STATUS.pause:
                return 'Resume'
            case STATUS.stop:
                return 'Start'
            default:
                return 'WAT'
        }
    }

    keymap = {
        ' ': this.buttonPressProceed,
    }

    reactToKeys = () => {
        this.keyPressed.forEach((key) => this.keymap[key] && this.keymap[key]())
        this.keyPressed = []
    }

    threatsIndex = 0

    startInterval = () => {
        this.interval = setInterval(this.updateFrame, this.state.frameLength)
    }

    updateFrame = () => {
        this.reactToKeys()

        if (this.state.status === STATUS.play) {
            this.moveThreats()
            this.controlThreats()
            this.moveHero()
            this.frame += 1
        }
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
                if (isGoingOut) {
                    this.setState({
                        beats: this.state.beats + 1,
                    })
                }

                threat.speed[axis] = (isGoingOut ? -1 : 1) * (threat.speed[axis] || 1)
            }
        }
        if (Math.abs(lean) > size * 3) {
            threat.isAroundField = false
            this.setState({
                outs: this.state.outs + 1
            })
        }

        return threat
    }

    beat = (field) => (threat) => {
        let newThreat = { ...threat }
        const canFlyAway = Math.random() < 1 / this.state.threatRemoveProbability
        const processThreat = this.processSpeed.bind(null, newThreat, this.state.threatSize, canFlyAway)

        if (newThreat.x < 0) {
            newThreat = processThreat({
                axis: 'x',
                lean: newThreat.x,
            })
        }
        const rightBorder = field.width - this.state.threatSize
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
        const bottomBorder = field.height - this.state.threatSize
        if (newThreat.y > bottomBorder) {
            newThreat = processThreat({
                axis: 'y',
                lean: newThreat.y - bottomBorder,
            })
        }

        return newThreat
    }

    addThreat = (field, threats) => {
        const size = this.state.threatSize
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
            id: this.threatsIndex += 1,
            x,
            y,
            speed,
            isOut: false,
            isAroundField: true,
        })

        this.lastTreatTime = this.frame
        this.setState({
            threats,
        })
    }

    controlThreats = () => {
        const field = this.state.field
        let threats = this.state.threats.map(this.beat(field))
        threats = threats.filter((threat) => threat.isAroundField)

        if (threats.length < this.state.threatLimit
            && this.frame >= this.lastTreatTime + (this.state.threatAddTimeout / this.state.frameLength)) {
            this.addThreat(field, threats)
        }

        this.setState({
            threats
        })
    }

    getHeroStatus = (x, y) => {
        const { heroSize, threatSize } = this.state
        const safeLength = (heroSize + threatSize) / 2
        const sizeFix = (threatSize - heroSize) / 2

        if (this.state.threats.some((threat) =>
                Math.abs(threat.x - x + sizeFix) < safeLength && Math.abs(threat.y - y + sizeFix) < safeLength
            )) {
            this.setState({
                status: STATUS.stop,
            })

            return heroStates.trouble
        }

        return heroStates.normal
    }

    moveHero = () => {
        const fieldPos = this.state.field
        let x = Math.max(RedSquares.mousePos.x - this.state.heroSize / 2, fieldPos.left)
        x = Math.min(x, fieldPos.right - this.state.heroSize)
        x -= fieldPos.left
        let y = Math.max(RedSquares.mousePos.y - this.state.heroSize / 2, fieldPos.top)
        y = Math.min(y, fieldPos.bottom - this.state.heroSize)
        y -= fieldPos.top

        this.setState({
            hero: {
                x,
                y,
                status: this.getHeroStatus(x, y),
            }
        })
    }

    getS = (num) => (num !== 1 ? 's' : '')

    IDS = {
        frameLength: 'frameLength',
        heroSize: 'heroSize',
        threatSize: 'threatSize',
        threatLimit: 'threatLimit',
        threatAddTimeout: 'threatAddTimeout',
        threatRemoveProbability: 'threatRemoveProbability',
        fieldWidth: 'fieldWidth',
        fieldHeight: 'fieldHeight',
    }

    changeHandler = (state) => (event) => {
        const initialValue = event.target.value
        let value

        switch (state) {
            case this.IDS.heroSize:
            case this.IDS.threatSize:
                value = parseInt(initialValue, 10) || 1
                break
            default:
                value = initialValue
        }
        this.setState({ [state]: value })
    }

    render () {
        return (
            <div className={style.wrapper}>
                <Field
                    style={style.field}
                    refHandler={(elem) => { this.field = elem }}
                    width={this.state.fieldWidth}
                    height={this.state.fieldHeight}
                >
                    <Square
                        style={this.state.hero.status.style}
                        refHandler={(elem) => { this.hero = elem }}
                        size={this.state.heroSize}
                        left={this.state.hero.x}
                        top={this.state.hero.y}
                    />
                    {this.state.threats.map((threat) => (
                        <Square
                            key={threat.id}
                            style={style.threat}
                            size={this.state.threatSize}
                            left={threat.x}
                            top={threat.y}
                        />
                    ))}
                </Field>
                <div className={style.side}>
                    <button onClick={this.buttonPressProceed}>{this.getButtonName()}</button>
                    {' (Press Space)'}
                    <h2>{this.state.beats || 'No'} beat{this.getS(this.state.beats)}</h2>
                    <h2>{this.state.outs || 'No'} out{this.getS(this.state.outs)}</h2>
                    <p>{this.state.threats.length || 'No'} threat{this.getS(this.state.threats.length)} on field</p>

                    <StateControl.Connector
                        state={this.state}
                        onChange={this.changeHandler}
                        onFocus={this.selectAll}
                    >
                        <StateControl.Input
                            id={this.IDS.frameLength}
                            label="Frame length (ms)"
                            onChange={this.changeHandler}
                        />
                        <StateControl.Input
                            id={this.IDS.heroSize}
                            label="Hero size (px)"
                            onChange={this.changeHandler}
                        />
                        <StateControl.Input
                            id={this.IDS.threatSize}
                            label="Threat size (px)"
                            onChange={this.changeHandler}
                        />
                        <StateControl.Input
                            id={this.IDS.threatLimit}
                            label="Threat limit"
                            onChange={this.changeHandler}
                        />
                        <StateControl.Input
                            id={this.IDS.threatAddTimeout}
                            label="Threat add timeout (ms)"
                            onChange={this.changeHandler}
                        />
                        <StateControl.Input
                            id={this.IDS.threatRemoveProbability}
                            label="Threat remove probability (1/x)"
                            onChange={this.changeHandler}
                        />
                        <StateControl.Input
                            id={this.IDS.fieldWidth}
                            label="Field width (px)"
                            onChange={this.changeHandler}
                        />
                        <StateControl.Input
                            id={this.IDS.fieldHeight}
                            label="Field height (px)"
                            onChange={this.changeHandler}
                        />
                    </StateControl.Connector>
                </div>
            </div>
        )
    }
}
