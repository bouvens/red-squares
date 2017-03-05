import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { heroStates } from '../constants/hero'
import InputCatcher from '../utils/InputCatcher'
import heroStyle from '../components/Hero.less'
import style from './RedSquares.less'
import Field from './Field'
import Square from './Square'
import Sidebar from './Sidebar'

const heroStyleMap = {
    [heroStates.normal]: heroStyle.hero,
    [heroStates.trouble]: heroStyle.heroInTrouble,
}

@connect(
    (state) => ({
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
    }),
    (dispatch) => bindActionCreators({
        processSpacePress: actions.game.processSpacePress,
        updateFrame: actions.game.updateFrame,
    }, dispatch)
)
export default class RedSquares extends React.Component {
    static propTypes = {
        frameLength: PropTypes.number,
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
        processSpacePress: PropTypes.func,
        updateFrame: PropTypes.func,
    }

    componentWillMount () {
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
        // TODO check in browsers and rewrite like https://learn.javascript.ru/coordinates-document
        return {
            left: fieldRect.offsetLeft,
            top: fieldRect.offsetTop,
            right: fieldRect.offsetLeft + fieldRect.clientWidth,
            bottom: fieldRect.offsetTop + fieldRect.clientHeight,
        }
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
                <Sidebar />
            </div>
        )
    }
}
