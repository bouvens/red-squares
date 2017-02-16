import React, { PropTypes } from 'react'
import { noOp } from '../utils'

const Field = (props) => (
    <div
        ref={props.refHandler}
        className={props.style}
        style={{
            width: `${props.width}px`,
            height: `${props.height}px`,
        }}
    >
        {props.children}
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
