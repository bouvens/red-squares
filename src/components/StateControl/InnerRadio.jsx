import React, { PropTypes } from 'react'
import { noOperation } from './utils'
import './Radio.css'

export default class InnerRadio extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        values: PropTypes.array,
        readOnly: PropTypes.bool,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        refHandler: PropTypes.func,
    }

    static defaultProps = {
        id: '',
        value: '',
        values: [],
        readOnly: false,
        onChange: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
        refHandler: noOperation,
    }

    render () {
        return (<div className="group" id={this.props.id}>
            {this.props.values.map((currentValue) => {
                const variantId = currentValue.id || currentValue

                return (
                    <div key={variantId}>
                        <input
                            id={variantId}
                            name={this.props.id}
                            type="radio"
                            ref={this.props.refHandler(this)}
                            value={variantId}
                            checked={this.props.value === variantId}
                            readOnly={this.props.readOnly}
                            onChange={this.props.onChange}
                            onClick={this.props.onClick(this)}
                            onFocus={this.props.onFocus(this)}
                        />
                        <label htmlFor={variantId}>{currentValue.label || currentValue}</label>
                    </div>
                )
            })}
        </div>)
    }
}
