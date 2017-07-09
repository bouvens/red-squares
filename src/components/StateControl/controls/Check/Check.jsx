import React from 'react'
import PropTypes from 'prop-types'
import controlled from '../../common/controlled'
import { noOperation } from '../../common/utils'
import './Check.css'

class Check extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.bool,
        label: PropTypes.string,
        readOnly: PropTypes.bool,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        refHandler: PropTypes.func,
    }

    static defaultProps = {
        id: '',
        value: false,
        label: '',
        readOnly: false,
        onChange: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
        multiLine: false,
        refHandler: noOperation,
    }

    render () {
        return (
            <div className="labeled-check">
                <input
                    id={this.props.id}
                    type="checkbox"
                    ref={this.props.refHandler(this)}
                    checked={this.props.value}
                    readOnly={this.props.readOnly}
                    onChange={this.props.onChange}
                    onClick={this.props.onClick(this)}
                    onFocus={this.props.onFocus(this)}
                />
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </div>
        )
    }
}

export default controlled(Check)
