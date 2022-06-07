import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Check, Connector, Input, Radio } from 'state-control'
import * as actions from '../actions'
import * as managers from '../controllers'
import { BUTTON_NAMES, GAME_STATUS, IDS, SPEEDS } from '../constants/game'

const extendConnection = (props, ids) => (state) => _.extend(
  props(state),
  _.mapValues(ids, (id) => _.get(state, id)),
)

const mapStateToIds = (state, ids) => _.mapValues(_.invert(ids), (id) => state[id])

export default @connect(
  extendConnection((state) => ({
    status: state.game.status,
    score: state.game.score,
    highestScore: state.game.highestScore,
    outs: state.game.outs,
    rivalsLength: state.rivals.rivals.length,
    manager: state.game.manager,
  }), IDS),
  {
    handlePauseButton: actions.game.playPauseGame,
    setState: actions.params.setState,
    clearHighest: actions.game.clearHighest,
  },
)
class Sidebar extends React.Component {
  changeHandler = this.props.setState

  static propTypes = {
    status: PropTypes.oneOf(_.values(GAME_STATUS)).isRequired,
    score: PropTypes.number.isRequired,
    highestScore: PropTypes.number.isRequired,
    outs: PropTypes.number.isRequired,
    rivalsLength: PropTypes.number.isRequired,
    handlePauseButton: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
    clearHighest: PropTypes.func.isRequired,
  }

  getS = (name, num) => `${num || 'No'} ${name}${num !== 1 ? 's' : ''}`

  render () {
    return (
      <>
        <button type="button" onClick={this.props.handlePauseButton}>{BUTTON_NAMES[this.props.status]}</button>
        {' '}
        (Press Space)
        <h2>
          Score:
          {' '}
          {this.props.score}
        </h2>
        <p>
          High score:
          {' '}
          {this.props.highestScore}
        </p>
        <p>{this.getS('out', this.props.outs)}</p>
        <p>
          {this.getS('rival', this.props.rivalsLength)}
          {' '}
          on the field
        </p>

        <Connector
          state={mapStateToIds(this.props, IDS)}
          onChange={this.changeHandler}
          defaultNum={1}
        >
          <Check
            id={IDS.autoRestart}
            label="Auto restart"
          />
          <Radio
            id={IDS.speed}
            label="Speed"
            values={_.keys(SPEEDS)}
          />
          <Radio
            id={IDS.manager}
            label="Control"
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
            id={IDS.rivalSize}
            label="Rival size (px)"
          />
          <Input
            id={IDS.rivalSpeed}
            label="Rival max speed (px/s)"
          />
          <Input
            id={IDS.rivalLimit}
            label="Rival limit"
          />
          <Input
            id={IDS.rivalAddTimeout}
            label="Rival add timeout (ms)"
          />
          <Input
            id={IDS.rivalRemoveProbability}
            label="Rival remove probability (1/x)"
          />
        </Connector>
        <button type="button" onClick={this.props.clearHighest}>⚠ Clear high score</button>
      </>
    )
  }
}
