import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { noOperation } from './utils'

const controlled = (Child) => class extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        state: PropTypes.object,
        path: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        defaultNum: PropTypes.number,
        onChange: PropTypes.func,
        decimalMark: PropTypes.string,
    }

    defaultProps = {
        state: {},
        path: '',
        value: '',
        defaultNum: void 0,
        onChange: noOperation,
        decimalMark: '.',
    }

    getId = () => `labeled-control-${this.props.id}`

    getPath = () => this.props.path || this.props.id

    getValue = () => {
        if (typeof this.props.value !== 'undefined') {
            return this.props.value
        }

        if (this.props.state && typeof this.props.state[this.getPath()] !== 'undefined') {
            return this.props.state[this.getPath()]
        }

        return void 0
    }

    prepareNum = (num) => num
        .replace(' ', '')
        .replace(',', '.')

    changeHandler = (event) => {
        let valueForReturn = event.target.value
        const { checked } = event.target
        const previousType = typeof this.getValue()

        if (previousType === 'boolean') {
            this.props.onChange(this.getPath(), checked)

            return
        }

        const valueForCheck = this.prepareNum(valueForReturn)

        if ((!isNaN(valueForCheck) && valueForCheck.length)
            || (previousType === 'number' && !valueForCheck.length && this.props.defaultNum)) {
            valueForReturn = valueForCheck
            if (valueForReturn.toString()[valueForReturn.toString().length - 1] !== '.') {
                const parseFunc = valueForReturn.indexOf('.') === -1 ? parseInt : parseFloat

                valueForReturn = parseFunc(valueForReturn, 10) || this.props.defaultNum || 0
            } else {
                valueForReturn = this.formatNum(valueForReturn)
            }
        }

        this.props.onChange(this.getPath(), valueForReturn)
    }

    formatNum = (num = this.getValue()) => num.toString().replace('.', this.props.decimalMark)

    showValue = () => {
        const value = this.getValue()

        switch (typeof value) {
            case 'number':
                return this.formatNum()
            case 'boolean':
            case 'string':
            case 'undefined':
                return value
            default:
                return value.toString()
        }
    }

    refHandler = (_this) => (control) => {
        _this.control = control
    }

    render () {
        const passedProps = _.omit(this.props, ['id', 'state', 'path', 'value', 'defaultNum', 'onChange'])

        return (
            <Child
                {...passedProps}
                id={this.getId()}
                value={this.showValue()}
                onChange={this.changeHandler}
                refHandler={this.refHandler}
            />
        )
    }
}

export default controlled
