import React, { PropTypes } from 'react'
import { noOperation } from './utils'
import style from './Radio.less'

export class Radio extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        state: PropTypes.object,
        path: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        values: PropTypes.array,
        readOnly: PropTypes.bool,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
    }

    static defaultProps = {
        value: '',
        onChange: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
        multiLine: false,
    }

    getPath = () => this.props.path || this.props.id
    getValue = () => this.props.value || (this.props.state && this.props.state[this.getPath()])

    refHandler = (control) => {
        this.control = control
    }

    render () {
        return (
            <div className={style.group} id={this.id}>
                {this.props.values.map((value) => {
                    const id = value.id || value

                    return (
                        <div key={id}>
                            <input
                                id={id}
                                name={this.props.id}
                                type="radio"
                                ref={this.refHandler}
                                value={id}
                                checked={this.getValue() === id}
                                readOnly={this.props.readOnly}
                                onChange={this.props.onChange(this.getPath())}
                                onClick={this.props.onClick(this)}
                                onFocus={this.props.onFocus(this)}
                            />
                            <label htmlFor={id}>{value.label || value}</label>
                        </div>
                    )
                })}
            </div>
        )
    }
}
