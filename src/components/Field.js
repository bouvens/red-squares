import React, { PropTypes } from 'react'
import { noOp } from '../utils'

const Field = (props) => (
    <div
        ref={props.refHandler}
        className={props.style}
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
}

Field.defaultProps = {
    children: null,
    refHandler: noOp,
}

export default Field
