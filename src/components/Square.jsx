import React, { PropTypes } from 'react'
import _ from 'lodash'

const Square = ({ top, left, size, className, style, refHandler }) => (
    <div
        ref={refHandler}
        className={className}
        style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.round(top)}px`,
            left: `${Math.round(left)}px`,
            ...style,
        }}
    />
)

Square.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    refHandler: PropTypes.func,
}

Square.defaultProps = {
    refHandler: _.noop,
    className: '',
    style: {},
}

export default Square
