import React, { PropTypes } from 'react'
import _ from 'lodash'

const Square = ({ top, left, size, style, refHandler }) => (
    <div
        ref={refHandler}
        className={style}
        style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}px`,
            left: `${left}px`,
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
    refHandler: _.noop,
}

export default Square
