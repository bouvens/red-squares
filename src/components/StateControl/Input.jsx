import React, { PropTypes } from 'react'
import { noOperation } from './utils'
import './Input.css'

export class Input extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        state: PropTypes.object,
        stateName: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        readOnly: PropTypes.bool,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        multiLine: PropTypes.bool,
    }

    static defaultProps = {
        value: '',
        onChange: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
        multiLine: false,
    }

    inner = this.props.multiLine ? 'textarea' : 'input'
    id = `labeled-control-${this.props.id}`
    stateName = this.props.stateName || this.props.id

    refHandler = (control) => { this.control = control }

    render () {
        return (
            <div className="labeled-input">
                <label htmlFor={this.id}>{this.props.label}</label>
                <this.inner
                    id={this.id}
                    label={this.props.label}
                    ref={this.refHandler}
                    value={this.props.state[this.stateName] || this.props.value}
                    readOnly={this.props.readOnly}
                    onChange={this.props.onChange(this.stateName)}
                    onClick={this.props.onClick(this)}
                    onFocus={this.props.onFocus(this)}
                />
            </div>
        )
    }
}
