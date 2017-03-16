import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from '../actions'
import { DEFAULTS } from '../constants/game'
import { HERO_STATUSES } from '../constants/hero'
import heroStyle from '../components/Hero.less'
import style from './RedSquares.less'
import Field from './Field'
import Square from './Square'
import Sidebar from './Sidebar'

const heroStyleMap = {
    [HERO_STATUSES.normal]: heroStyle.hero,
    [HERO_STATUSES.trouble]: heroStyle.heroInTrouble,
}

@connect(
    (state) => ({
        fieldWidth: state.game.fieldWidth,
        fieldHeight: state.game.fieldHeight,
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
        init: actions.game.init,
    }, dispatch)
)
export default class RedSquares extends React.Component {
    static propTypes = {
        fieldWidth: PropTypes.number,
        fieldHeight: PropTypes.number,
        heroStatus: PropTypes.oneOf(_.values(HERO_STATUSES)),
        heroSize: PropTypes.number,
        heroPos: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        threatSize: PropTypes.number,
        threats: PropTypes.array,
        init: PropTypes.func,
    }

    componentDidMount () {
        this.props.init(this)
    }

    getFieldSize = () => {
        const fieldRect = this.field

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
            <div className={style.wrapper} style={{ width: `${this.props.fieldWidth + DEFAULTS.sideWidth}px` }}>
                <Field
                    style={style.field}
                    refHandler={this.refHandler}
                    width={this.props.fieldWidth}
                    height={this.props.fieldHeight}
                >
                    <Square
                        style={heroStyleMap[this.props.heroStatus]}
                        size={this.props.heroSize * 2}
                        left={this.props.heroPos.x - this.props.heroSize}
                        top={this.props.heroPos.y - this.props.heroSize}
                    />
                    {this.props.threats.map((threat) => (
                        <Square
                            key={threat.id}
                            style={style.threat}
                            size={this.props.threatSize * 2}
                            left={threat.x - this.props.threatSize}
                            top={threat.y - this.props.threatSize}
                        />
                    ))}
                </Field>
                <Sidebar />
            </div>
        )
    }
}
