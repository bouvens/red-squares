import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { HERO_STATUSES } from '../constants/hero'
import style from './RedSquares.less'

const heroStyle = {
    [HERO_STATUSES.normal]: 'rgb(50, 205, 50)',
    [HERO_STATUSES.trouble]: 'rgb(237, 20, 61)',
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
        shadows: state.hero.shadows,
        error: state.game.error,
    })
)
export default class CanvasField extends React.Component {
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
        shadows: PropTypes.array,
        error: PropTypes.string,
        refHandler: PropTypes.func,
    }

    static drawSquare ({ ctx, pos, size, color }) {
        ctx.fillStyle = color
        ctx.fillRect(
            Math.round(pos.x - size),
            Math.round(pos.y - size),
            size * 2,
            size * 2
        )
    }

    paint () {
        if (!this.canvas) {
            return
        }
        const ctx = this.canvas.getContext('2d')

        ctx.clearRect(0, 0, this.props.fieldWidth, this.props.fieldHeight)

        this.props.shadows.forEach((shadow, index) => CanvasField.drawSquare({
            ctx,
            pos: this.props.shadows[index],
            size: this.props.heroSize,
            color: `rgba(237, 20, 61, ${(this.props.shadows.length - index - 1) / this.props.shadows.length * 0.2})`,
        }))
        CanvasField.drawSquare({
            ctx,
            pos: this.props.heroPos,
            size: this.props.heroSize,
            color: heroStyle[this.props.heroStatus],
        })
        this.props.threats.forEach((threat) => (
            CanvasField.drawSquare({
                ctx,
                pos: threat,
                size: this.props.threatSize,
                color: 'rgb(100, 149, 237)',
            })
        ))
    }

    canvas = null

    handleRefCanvas = (elem) => {
        this.canvas = elem
        this.props.refHandler(elem)
    }

    render () {
        this.paint()

        return (
            <div className={style.fieldWrapper}>
                <canvas
                    className={style.field}
                    ref={this.handleRefCanvas}
                    width={this.props.fieldWidth}
                    height={this.props.fieldHeight}
                >
                    {'You are using an outdated browser.'}
                </canvas>
                <div className={style.error}>{this.props.error}</div>
            </div>
        )
    }
}
