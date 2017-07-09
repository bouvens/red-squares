import React from 'react'
import PropTypes from 'prop-types'
import { noOperation } from './utils'

const controlled = (Child) => class extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        id: PropTypes.string.isRequired,
        state: PropTypes.object,
        path: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        values: PropTypes.array,
        readOnly: PropTypes.bool,
        label: PropTypes.string,
        defaultNum: PropTypes.number,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        multiLine: PropTypes.bool,
    }

    defaultProps = {
        children: null,
        state: {},
        path: '',
        value: '',
        values: [],
        readOnly: false,
        label: '',
        defaultNum: 0,
        onChange: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
        multiLine: false,
    }

    render () {
        const { id, state, path, value, defaultNum, onChange, ...passedProps } = this.props

        const getId = () => `labeled-control-${id}`
        const getPath = () => path || id
        const getValue = () => value || (state && state[getPath()])
        const changeHandler = (event) => {
            let valueForReturn = event.target.value
            const { checked } = event.target

            switch (typeof getValue()) {
                case 'number':
                    valueForReturn = parseInt(valueForReturn, 10) || defaultNum
                    break
                case 'boolean':
                    valueForReturn = checked
                    break
                case 'string':
                default:
                    valueForReturn = valueForReturn || ''
                    break
            }

            onChange(getPath(), valueForReturn)
        }
        const refHandler = (_this) => (control) => {
            _this.control = control
        }

        return (
            <Child
                {...passedProps}
                id={getId()}
                value={getValue()}
                onChange={changeHandler}
                refHandler={refHandler}
            />
        )
    }
}

export default controlled
