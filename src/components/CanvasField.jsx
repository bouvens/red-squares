import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { HERO_STATUSES } from '../constants/hero'
import style from './RedSquares.less'

const heroStyle = {
  [HERO_STATUSES.normal]: 'rgb(50, 205, 50)',
  [HERO_STATUSES.trouble]: 'rgb(237, 20, 61)',
}

export default @connect(
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
    shadows: state.hero.shadows,
    error: state.game.error,
  }),
)
class CanvasField extends React.PureComponent {
  canvas = null

  static propTypes = {
    fieldWidth: PropTypes.number.isRequired,
    fieldHeight: PropTypes.number.isRequired,
    heroStatus: PropTypes.oneOf(_.values(HERO_STATUSES)).isRequired,
    heroSize: PropTypes.number.isRequired,
    heroPos: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    threatSize: PropTypes.number.isRequired,
    threats: PropTypes.arrayOf(PropTypes.object).isRequired,
    shadows: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    refHandler: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.paint()
  }

  componentDidUpdate () {
    this.paint()
  }

  clear = () => {
    this.canvas.clearRect(0, 0, this.props.fieldWidth, this.props.fieldHeight)
  }

  drawSquare = ({ pos, size, color }) => {
    this.canvas.fillStyle = color
    this.canvas.fillRect(
      Math.round(pos.x - size),
      Math.round(pos.y - size),
      size * 2,
      size * 2,
    )
  }

  paint = () => {
    this.clear()

    this.props.shadows.forEach((shadow, index) => this.drawSquare({
      pos: this.props.shadows[index],
      size: this.props.heroSize,
      color: `rgba(237, 20, 61, ${((this.props.shadows.length - index - 1) / this.props.shadows.length) * 0.2})`,
    }))
    this.drawSquare({
      pos: this.props.heroPos,
      size: this.props.heroSize,
      color: heroStyle[this.props.heroStatus],
    })
    this.props.threats.forEach((threat) => (
      this.drawSquare({
        pos: threat,
        size: this.props.threatSize,
        color: 'rgb(100, 149, 237)',
      })
    ))
  }

  handleRefCanvas = (elem) => {
    this.canvas = elem.getContext('2d')
    this.props.refHandler(elem)
  }

  render () {
    return (
      <div>
        <canvas
          className={style.field}
          ref={this.handleRefCanvas}
          width={this.props.fieldWidth}
          height={this.props.fieldHeight}
        >
          You are using an outdated browser.
        </canvas>
        <div className={style.error}>{this.props.error}</div>
      </div>
    )
  }
}
