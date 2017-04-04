import React, { PropTypes } from 'react'
import { noOperation } from './utils'

const ControlledComponent = (props) => {
    const { children, id, state, path, value, onChange, ...passedProps } = props

    const getId = () => `labeled-control-${id}`
    const getPath = () => path || id
    const getValue = () => value || (state && state[getPath()])
    const refHandler = (_this) => (control) => {
        _this.control = control
    }

    const Inner = children.type

    return (
        <Inner
            {...passedProps}
            id={getId()}
            value={getValue()}
            onChange={onChange(getPath())}
            refHandler={refHandler}
        />
    )
}

ControlledComponent.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    state: PropTypes.object,
    path: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    values: PropTypes.array,
    readOnly: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    multiLine: PropTypes.bool,
}

ControlledComponent.defaultProps = {
    children: null,
    state: {},
    path: '',
    value: '',
    values: [],
    readOnly: false,
    label: '',
    onChange: noOperation,
    onClick: noOperation,
    onFocus: noOperation,
    multiLine: false,
}

export default ControlledComponent
