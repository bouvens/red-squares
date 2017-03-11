import React, { PropTypes } from 'react'
import _ from 'lodash'

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
    refHandler: _.noop,
    width: 640,
    height: 480,
}

export default Field
