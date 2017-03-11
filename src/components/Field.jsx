import React, { PropTypes } from 'react'
import { noOp } from '../utils/funcs'

const Field = ({ style, children, refHandler, width, height }) => (
    <div
        ref={refHandler}
        className={style}
        style={{
            width: `${width}px`,
            height: `${height}px`,
        }}
    >
        {children}
    </div>
)

Field.propTypes = {
    style: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    refHandler: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
}

Field.defaultProps = {
    children: null,
    refHandler: noOp,
    width: 640,
    height: 480,
}

export default Field
