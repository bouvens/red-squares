import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from '../actions'
import { DEFAULTS } from '../constants/game'
import style from './RedSquares.less'
import CanvasField from './CanvasField'
import Sidebar from './Sidebar'

export default @connect(
  (state) => ({
    fieldWidth: state.game.fieldWidth,
  }),
  {
    init: actions.game.init,
    processSpacePress: actions.game.playPauseGame,
  },
)
class RedSquares extends React.Component {
  static propTypes = {
    fieldWidth: PropTypes.number,
    init: PropTypes.func,
  }

  static defaultProps = {
    fieldWidth: 800,
    init: _.noop,
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

  handleRefField = (elem) => {
    this.field = elem
  }

  render () {
    return (
      <div className={style.wrapper} style={{ width: `${this.props.fieldWidth + DEFAULTS.sideWidth}px` }}>
        <div className={style.fieldWrapper}>
          <p><a href="/" title="JavaScript experiments">← To all the experiments</a></p>
          <CanvasField refHandler={this.handleRefField} />
        </div>
        <div className={style.side} style={{ width: `${DEFAULTS.sideWidth}px` }}>
          <Sidebar />
        </div>
      </div>
    )
  }
}
