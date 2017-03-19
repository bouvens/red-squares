import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import * as actions from '../actions'
import * as managers from '../managers'
import { GAME_STATUS, BUTTON_NAMES, IDS, DEFAULTS } from '../constants/game'
import { Connector, Input, Radio } from './StateControl'
import style from './RedSquares.less'

@connect(
    (state) => _.extend(
        {
            status: state.game.status,
            beats: state.game.beats,
            highestBeats: state.game.highestBeats,
            outs: state.game.outs,
            threatsLength: state.threats.threats.length,
            manager: state.game.manager,
        },
        _.mapValues(IDS, (id) => _.get(state, id))
    ),
    (dispatch) => bindActionCreators({
        processSpacePress: actions.game.processSpacePress,
        setState: actions.params.setState,
        clearHighest: actions.game.clearHighest,
    }, dispatch)
)
export default class Sidebar extends React.Component {
    static propTypes = {
        status: PropTypes.oneOf(_.values(GAME_STATUS)),
        beats: PropTypes.number,
        highestBeats: PropTypes.number,
        outs: PropTypes.number,
        threatsLength: PropTypes.number,
        manager: PropTypes.string,
        heroSize: PropTypes.number,
        threatSize: PropTypes.number,
        threatLimit: PropTypes.number,
        threatAddTimeout: PropTypes.number,
        threatRemoveProbability: PropTypes.number,
        fieldWidth: PropTypes.number,
        fieldHeight: PropTypes.number,
        processSpacePress: PropTypes.func,
        setState: PropTypes.func,
        clearHighest: PropTypes.func,
    }

    getS = (name, num) => `${num || 'No'} ${name}${num !== 1 ? 's' : ''}`

    changeHandler = (path) => (event) => {
        let { value } = event.target

        switch (path) {
            case IDS.manager:
                break
            default:
                value = parseInt(value, 10) || 1
        }

        this.props.setState(path, value)
    }

    render () {
        return (
            <div className={style.side} style={{ width: `${DEFAULTS.sideWidth}px` }}>
                <button onClick={this.props.processSpacePress}>{BUTTON_NAMES[this.props.status]}</button>
                {' (Press Space)'}
                <h2>{this.getS('beat', this.props.beats)}</h2>
                <p>Highest beats: {this.props.highestBeats}</p>
                <p>{this.getS('out', this.props.outs)}</p>
                <p>{this.getS('threat', this.props.threatsLength)} on field</p>

                {'Control'}
                <Radio
                    id={IDS.manager}
                    state={_.mapValues(_.invert(IDS), (id) => this.props[id])}
                    values={_.keys(managers)}
                    onChange={this.changeHandler}
                />
                <Connector
                    state={_.mapValues(_.invert(IDS), (id) => this.props[id])}
                    onChange={this.changeHandler}
                >
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
