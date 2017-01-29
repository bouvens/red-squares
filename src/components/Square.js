import React, { PropTypes } from 'react'
import { noOp } from '../utils'

const Square = (props) => (
    <div
        ref={props.refHandler}
        className={props.style}
        style={{
            width: `${props.size}px`,
            height: `${props.size}px`,
            top: `${props.top}px`,
            left: `${props.left}px`,
        }}
    />
)

Square.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    style: PropTypes.string.isRequired,
    refHandler: PropTypes.func,
}

Square.defaultProps = {
    refHandler: noOp,
}

export default Square
