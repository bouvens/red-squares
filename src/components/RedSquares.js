import React, { Component, PropTypes } from 'react'
import { gameStatus, heroStates } from '../constants'
import style from './RedSquares.less'
import InputCatcher from '../inputCatcher'
import Field from './Field'
import Square from './Square'
import StateControl from './StateControl'

export default class RedSquares extends Component {
    static propTypes = {
        defaults: PropTypes.objectOf(PropTypes.number).isRequired,
    }

    constructor (props) {
        super(props)
        this.inputCatcher = new InputCatcher({
            ' ': this.spacePressProceed,
        })

        setTimeout(() => this.setState({
            hero: {
                ...this.state.hero,
                x: (this.field.clientWidth - this.state.heroSize) / 2,
                y: (this.field.clientHeight - this.state.heroSize) / 2,
            }
        }), 0)

        this.startInterval()
    }

    state = {
        status: gameStatus.stop,
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
        fieldWidth: this.props.defaults.fieldWidth,
        fieldHeight: this.props.defaults.fieldHeight,
        sideWidth: this.props.defaults.sideWidth,
    }

    spacePressProceed = () => {
        switch (this.state.status) {
            case gameStatus.play:
                this.setState({
                    status: gameStatus.pause,
                })
                break
            case gameStatus.pause:
                this.setState({
                    status: gameStatus.play,
                })
                break
            case gameStatus.stop:
            default:
                this.setState({
                    status: gameStatus.play,
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

    buttonName = {
        [gameStatus.play]: 'Pause',
        [gameStatus.pause]: 'Resume',
        [gameStatus.stop]: 'Start',
    }

    getButtonName = () => this.buttonName[this.state.status]

    startInterval = () => {
        this.interval = setInterval(this.updateFrame, this.state.frameLength)
    }

    updateFrame = () => {
        this.inputCatcher.reactToKeys()

        if (this.state.status === gameStatus.play) {
            this.controlThreats()
            this.moveHero()
            this.frame += 1
        }
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

    beat = (threat) => {
        let newThreat = { ...threat }
        const canFlyAway = Math.random() < 1 / this.state.threatRemoveProbability
        const processThreat = this.processSpeed.bind(null, newThreat, this.state.threatSize, canFlyAway)

        if (newThreat.x < 0) {
            newThreat = processThreat({
                axis: 'x',
                lean: newThreat.x,
            })
        }
        const rightBorder = this.state.fieldWidth - this.state.threatSize
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
        const bottomBorder = this.state.fieldHeight - this.state.threatSize
        if (newThreat.y > bottomBorder) {
            newThreat = processThreat({
                axis: 'y',
                lean: newThreat.y - bottomBorder,
            })
        }

        return newThreat
    }

    threatsIndex = 0
    addThreat = (threats) => {
        const size = this.state.threatSize
        let x = Math.round(Math.random() * (this.state.fieldWidth - size))
        let y = 0 - size
        let speed = {
            x: Math.round(Math.random() * 8 - 4),
            y: Math.ceil(Math.random() * 4),
        }

        if (Math.random() < 0.5) {
            x = 0 - size
            y = Math.round(Math.random() * (this.state.fieldHeight - size))
            speed = {
                x: Math.ceil(Math.random() * 4),
                y: Math.round(Math.random() * 8 - 4),
            }

            if (Math.random() < 0.5) {
                x = this.state.fieldWidth
                speed.x = -speed.x
            }
        } else if (Math.random() < 0.5) {
            y = this.state.fieldHeight
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
        let threats = this.state.threats
            .map((threat) => (
                {
                    ...threat,
                    x: threat.x + threat.speed.x,
                    y: threat.y + threat.speed.y,
                }
            ))
            .map(this.beat)
        threats = threats.filter((threat) => threat.isAroundField)

        if (threats.length < this.state.threatLimit
            && this.frame >= this.lastTreatTime + (this.state.threatAddTimeout / this.state.frameLength)) {
            this.addThreat(threats)
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
                status: gameStatus.stop,
            })

            return heroStates.trouble
        }

        return heroStates.normal
    }

    getFieldSize = () => {
        const fieldRect = this.field
        // TODO check and browsers and rewrite like https://learn.javascript.ru/coordinates-document
        return {
            left: fieldRect.offsetLeft,
            top: fieldRect.offsetTop,
            right: fieldRect.offsetLeft + this.state.fieldWidth,
            bottom: fieldRect.offsetTop + this.state.fieldHeight,
        }
    }

    moveHero = () => {
        const fieldPos = this.getFieldSize()

        let x = Math.max(InputCatcher.mousePos.x - this.state.heroSize / 2, fieldPos.left)
        x = Math.min(x, fieldPos.right - this.state.heroSize)
        x -= fieldPos.left
        let y = Math.max(InputCatcher.mousePos.y - this.state.heroSize / 2, fieldPos.top)
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

    getS = (name, num) => name + (num !== 1 ? 's' : '')

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
            case this.IDS.fieldWidth:
            case this.IDS.fieldHeight:
                value = parseInt(initialValue, 10) || 1
                break
            default:
                value = initialValue
        }
        this.setState({ [state]: value })
    }

    render () {
        return (
            <div className={style.wrapper} style={{ width: `${this.state.fieldWidth + this.state.sideWidth}px` }}>
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
                <div className={style.side} style={{ width: `${this.state.sideWidth}px` }}>
                    <button onClick={this.spacePressProceed}>{this.getButtonName()}</button>
                    {' (Press Space)'}
                    <h2>{this.state.beats || 'No'} {this.getS('beat', this.state.beats)}</h2>
                    <h2>{this.state.outs || 'No'} {this.getS('out', this.state.outs)}</h2>
                    <p>{this.state.threats.length || 'No'} {this.getS('threat', this.state.threats.length)} on field</p>

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
