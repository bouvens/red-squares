import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { gameStatus, buttonName, IDS } from '../constants/game'
import { heroStates } from '../constants/hero'
import InputCatcher from '../utils/InputCatcher'
import heroStyle from '../components/Hero.less'
import style from './RedSquares.less'
import Field from './Field'
import Square from './Square'
import { Connector, Input } from './StateControl'

const heroStyleMap = {
    [heroStates.normal]: heroStyle.hero,
    [heroStates.trouble]: heroStyle.heroInTrouble,
}

@connect(
    (state) => ({
        status: state.game.status,
        frameLength: state.game.frameLength,
        fieldWidth: state.game.fieldWidth,
        fieldHeight: state.game.fieldHeight,
        sideWidth: state.game.sideWidth,
        heroStatus: state.hero.status,
        heroSize: state.hero.size,
        heroPos: {
            x: state.hero.x,
            y: state.hero.y,
        },
        threatSize: state.threats.size,
        threats: state.threats.threats,
        beats: state.game.beats,
        outs: state.game.outs,
        threatLimit: state.threats.limit,
        threatAddTimeout: state.threats.addTimeout,
        threatRemoveProbability: state.threats.removeProbability,
        frame: state.game.frame,
    }),
    (dispatch) => bindActionCreators({
        processSpacePress: actions.game.processSpacePress,
        updateFrame: actions.game.updateFrame,
        setState: actions.game.setState,
    }, dispatch)
)
export default class RedSquares extends React.Component {
    static propTypes = {
        status: PropTypes.oneOf(Object.values(gameStatus)),
        frameLength: PropTypes.number,
        processSpacePress: PropTypes.func,
        updateFrame: PropTypes.func,
        setState: PropTypes.func,
        fieldWidth: PropTypes.number,
        fieldHeight: PropTypes.number,
        sideWidth: PropTypes.number,
        heroStatus: PropTypes.oneOf(Object.values(heroStates)),
        heroSize: PropTypes.number,
        heroPos: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        threatSize: PropTypes.number,
        threats: PropTypes.array,
        beats: PropTypes.number,
        outs: PropTypes.number,
        threatLimit: PropTypes.number,
        threatAddTimeout: PropTypes.number,
        threatRemoveProbability: PropTypes.number,
        frame: PropTypes.number,
    }

    constructor (props) {
        super(props)
        this.inputCatcher = new InputCatcher({
            ' ': this.props.processSpacePress,
        })

        setInterval(this.tick, this.props.frameLength)
    }

    tick = () => {
        this.inputCatcher.reactToKeys()
        this.props.updateFrame(InputCatcher.mousePos, this.getFieldSize())
    }

    getFieldSize = () => {
        const fieldRect = this.field
        // TODO check and browsers and rewrite like https://learn.javascript.ru/coordinates-document
        return {
            left: fieldRect.offsetLeft,
            top: fieldRect.offsetTop,
            right: fieldRect.offsetLeft + fieldRect.clientWidth,
            bottom: fieldRect.offsetTop + fieldRect.clientHeight,
        }
    }

    getS = (name, num) => (num || 'No') + ' ' + name + (num !== 1 ? 's' : '')

    changeHandler = (state) => (event) => {
        const initialValue = event.target.value
        let value

        switch (state) {
            default:
                value = parseInt(initialValue, 10) || 1
        }
        this.props.setState(state, value)
    }

    refHandler = (elem) => { this.field = elem }

    render () {
        return (
            <div className={style.wrapper} style={{ width: `${this.props.fieldWidth + this.props.sideWidth}px` }}>
                <Field
                    style={style.field}
                    refHandler={this.refHandler}
                    width={this.props.fieldWidth}
                    height={this.props.fieldHeight}
                >
                    <Square
                        style={heroStyleMap[this.props.heroStatus]}
                        size={this.props.heroSize}
                        left={this.props.heroPos.x}
                        top={this.props.heroPos.y}
                    />
                    {this.props.threats.map((threat) => (
                        <Square
                            key={threat.id}
                            style={style.threat}
                            size={this.props.threatSize}
                            left={threat.x}
                            top={threat.y}
                        />
                    ))}
                </Field>
                <div className={style.side} style={{ width: `${this.props.sideWidth}px` }}>
                    <button onClick={this.props.processSpacePress}>{buttonName[this.props.status]}</button>
                    {' (Press Space)'}
                    <h2>{this.getS('beat', this.props.beats)}</h2>
                    <h2>{this.getS('out', this.props.outs)}</h2>
                    <p>{this.getS('threat', this.props.threats.length)} on field</p>
                    <p>{this.getS('frame', this.props.frame)}</p>

                    <Connector
                        state={this.props}
                        onChange={this.changeHandler}
                    >
                        <Input
                            id={IDS.frameLength}
                            label="Frame length (ms)"
                        />
                        <Input
                            id={IDS.heroSize}
                            label="Hero size (px)"
                        />
                        <Input
                            id={IDS.threatSize}
                            label="Threat size (px)"
                        />
                        <Input
                            id={IDS.threatLimit}
                            label="Threat limit"
                        />
                        <Input
                            id={IDS.threatAddTimeout}
                            label="Threat add timeout (ms)"
                        />
                        <Input
                            id={IDS.threatRemoveProbability}
                            label="Threat remove probability (1/x)"
                        />
                        <Input
                            id={IDS.fieldWidth}
                            label="Field width (px)"
                        />
                        <Input
                            id={IDS.fieldHeight}
                            label="Field height (px)"
                        />
                    </Connector>
                </div>
            </div>
        )
    }
}
