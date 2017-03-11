import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { GAME_STATUS, BUTTON_NAMES, IDS } from '../constants/game'
import { Connector, Input } from './StateControl'
import style from './RedSquares.less'

@connect(
    (state) => ({
        sideWidth: state.game.sideWidth,
        status: state.game.status,
        beats: state.game.beats,
        highestBeats: state.game.highestBeats,
        outs: state.game.outs,
        threatsLength: state.threats.threats.length,
        heroSize: state.hero.size,
        threatSize: state.threats.size,
        threatLimit: state.threats.limit,
        threatAddTimeout: state.threats.addTimeout,
        threatRemoveProbability: state.threats.removeProbability,
        fieldWidth: state.game.fieldWidth,
        fieldHeight: state.game.fieldHeight,
    }),
    (dispatch) => bindActionCreators({
        processSpacePress: actions.game.processSpacePress,
        setState: actions.game.setState,
    }, dispatch)
)
export default class Sidebar extends React.Component {
    static propTypes = {
        sideWidth: PropTypes.number,
        status: PropTypes.oneOf(Object.values(GAME_STATUS)),
        beats: PropTypes.number,
        highestBeats: PropTypes.number,
        outs: PropTypes.number,
        threatsLength: PropTypes.number,
        heroSize: PropTypes.number,
        threatSize: PropTypes.number,
        threatLimit: PropTypes.number,
        threatAddTimeout: PropTypes.number,
        threatRemoveProbability: PropTypes.number,
        fieldWidth: PropTypes.number,
        fieldHeight: PropTypes.number,
        processSpacePress: PropTypes.func,
        setState: PropTypes.func,
    }

    getS = (name, num) => `${num || 'No'} ${name}${num !== 1 ? 's' : ''}`

    changeHandler = (state) => (event) => {
        const initialValue = event.target.value
        let value

        switch (state) {
            default:
                value = parseInt(initialValue, 10) || 1
        }
        this.props.setState(state, value)
    }

    render () {
        return (
            <div className={style.side} style={{ width: `${this.props.sideWidth}px` }}>
                <button onClick={this.props.processSpacePress}>{BUTTON_NAMES[this.props.status]}</button>
                {' (Press Space)'}
                <h2>{this.getS('beat', this.props.beats)}</h2>
                <p>Highest beats: {this.props.highestBeats}</p>
                <p>{this.getS('out', this.props.outs)}</p>
                <p>{this.getS('threat', this.props.threatsLength)} on field</p>

                <Connector
                    state={this.props}
                    onChange={this.changeHandler}
                >
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
        )
    }
}
