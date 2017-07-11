import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { noOperation } from '../../common/utils'
import './Setter.css'

const Setter = ({ text, tabIndex, onClick }) => (
    <div className="setter">
        <a onClick={onClick} tabIndex={tabIndex}>{text}</a>
    </div>
)

Setter.propTypes = {
    text: PropTypes.string,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func,
}

Setter.defaultProps = {
    text: '',
    tabIndex: -1,
    onClick: noOperation,
}

const setParams = (setHandler, params) => () => {
    _.each(params, (value, name) => {
        setHandler(name, value)
    })
}

export const SettersBlock = ({ className, setters, setHandler, tabIndexOffset }) => {
    let index = 0

    return (<div className={`${className} setters-block`}>
        {setters.map((setter) => {
            index += 1

            return (<Setter
                onClick={setParams(setHandler, setter.params)}
                key={index}
                tabIndex={index + tabIndexOffset}
                text={setter.text}
            />)
        })}
    </div>)
}

SettersBlock.propTypes = {
    className: PropTypes.string,
    setters: PropTypes.array.isRequired,
    setHandler: PropTypes.func.isRequired,
    tabIndexOffset: PropTypes.number,
}

SettersBlock.defaultProps = {
    className: '',
    tabIndexOffset: 1,
}
