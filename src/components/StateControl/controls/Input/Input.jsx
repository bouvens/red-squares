import React from 'react'
import PropTypes from 'prop-types'
import controlled from '../../common/controlled'
import { noOperation } from '../../common/utils'
import './Input.css'

class Input extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        readOnly: PropTypes.bool,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        multiLine: PropTypes.bool,
        refHandler: PropTypes.func,
    }

    static defaultProps = {
        id: '',
        value: '',
        label: '',
        readOnly: false,
        onChange: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
        multiLine: false,
        refHandler: noOperation,
    }

    render () {
        const Inner = this.props.multiLine ? 'textarea' : 'input'

        return (
            <div className="labeled-input">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <Inner
                    id={this.props.id}
                    ref={this.props.refHandler(this)}
                    value={this.props.value}
                    readOnly={this.props.readOnly}
                    onChange={this.props.onChange}
                    onClick={this.props.onClick(this)}
                    onFocus={this.props.onFocus(this)}
                />
            </div>
        )
    }
}

export default controlled(Input)
