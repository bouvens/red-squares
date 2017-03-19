import React, { PropTypes } from 'react'
import { noOperation } from './utils'
import './Input.css'

export class Input extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        state: PropTypes.object,
        path: PropTypes.string,
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
    getId = () => `labeled-control-${this.props.id}`
    getPath = () => this.props.path || this.props.id
    getValue = () => this.props.value || (this.props.state && this.props.state[this.getPath()])

    refHandler = (control) => {
        this.control = control
    }

    render () {
        return (
            <div className="labeled-input">
                <label htmlFor={this.getId()}>{this.props.label}</label>
                <this.inner
                    id={this.getId()}
                    ref={this.refHandler}
                    value={this.getValue()}
                    readOnly={this.props.readOnly}
                    onChange={this.props.onChange(this.getPath())}
                    onClick={this.props.onClick(this)}
                    onFocus={this.props.onFocus(this)}
                />
            </div>
        )
    }
}
