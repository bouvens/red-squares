import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { DEFAULTS } from '../constants/game'
import style from './RedSquares.less'
import CanvasField from './CanvasField'
import Sidebar from './Sidebar'

@connect(
    (state) => ({
        fieldWidth: state.game.fieldWidth,
    }),
    (dispatch) => bindActionCreators({
        init: actions.game.init,
    }, dispatch)
)
export default class RedSquares extends React.Component {
    static propTypes = {
        fieldWidth: PropTypes.number,
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

    handleRefField = (elem) => { this.field = elem }

    render () {
        return (
            <div className={style.wrapper} style={{ width: `${this.props.fieldWidth + DEFAULTS.sideWidth}px` }}>
                <CanvasField refHandler={this.handleRefField} />
                <Sidebar />
            </div>
        )
    }
}
