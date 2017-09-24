import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Connector, Input, Radio, Check, extendConnection, mapStateToIds } from 'state-control'
import * as actions from '../actions'
import * as managers from '../controllers'
import { BUTTON_NAMES, DEFAULTS, GAME_STATUS, IDS, SPEEDS } from '../constants/game'
import style from './RedSquares.less'

@connect(
    extendConnection((state) => ({
        status: state.game.status,
        beats: state.game.beats,
        highestBeats: state.game.highestBeats,
        outs: state.game.outs,
        threatsLength: state.threats.threats.length,
        manager: state.game.manager,
    }), IDS),
    (dispatch) => bindActionCreators({
        processSpacePress: actions.game.processSpacePress,
        setState: actions.params.setState,
        clearHighest: actions.game.clearHighest,
    }, dispatch)
)
export default class Sidebar extends React.Component {
    static propTypes = {
        status: PropTypes.oneOf(_.values(GAME_STATUS)).isRequired,
        beats: PropTypes.number.isRequired,
        highestBeats: PropTypes.number.isRequired,
        outs: PropTypes.number.isRequired,
        threatsLength: PropTypes.number.isRequired,
        processSpacePress: PropTypes.func.isRequired,
        setState: PropTypes.func.isRequired,
        clearHighest: PropTypes.func.isRequired,
    }

    getS = (name, num) => `${num || 'No'} ${name}${num !== 1 ? 's' : ''}`

    changeHandler = this.props.setState

    render () {
        return (
            <div className={style.side} style={{ width: `${DEFAULTS.sideWidth}px` }}>
                <button onClick={this.props.processSpacePress}>{BUTTON_NAMES[this.props.status]}</button>
                {' (Press Space)'}
                <h2>{this.getS('beat', this.props.beats)}</h2>
                <p>Highest beats: {this.props.highestBeats}</p>
                <p>{this.getS('out', this.props.outs)}</p>
                <p>{this.getS('threat', this.props.threatsLength)} on field</p>

                <Connector
                    state={mapStateToIds(this.props, IDS)}
                    onChange={this.changeHandler}
                    defaultNum={1}
                >
                    <Check
                        id={IDS.autoRestart}
                        label="Auto restart"
                    />
                    {'Speed'}
                    <Radio
                        id={IDS.speed}
                        values={_.keys(SPEEDS)}
                    />
                    {'Control'}
                    <Radio
                        id={IDS.manager}
                        values={_.keys(managers)}
                    />
                    <Input
                        id={IDS.heroSize}
                        label="Hero size (px)"
                    />
                    <Input
                        id={IDS.heroSpeed}
                        label="Hero max speed (px/s)"
                    />
                    <Input
                        id={IDS.threatSize}
                        label="Threat size (px)"
                    />
                    <Input
                        id={IDS.threatSpeed}
                        label="Threat max speed (px/s)"
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
                </Connector>
                <button onClick={this.props.clearHighest}>Clear highest</button>
            </div>
        )
    }
}
