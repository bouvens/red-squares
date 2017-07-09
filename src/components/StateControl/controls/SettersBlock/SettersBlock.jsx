import React from 'react'
import PropTypes from 'prop-types'
import { noOperation } from '../../common/utils'

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

export const SettersBlock = ({ setters, setState, tabIndexOffset }) => {
    let index = 0

    return (<div className="setters-block">
        {setters.map((setter) => {
            index += 1

            return (<Setter
                onClick={() => setState(setter.params)}
                key={index}
                tabIndex={index + tabIndexOffset}
                text={setter.text}
            />)
        })}
    </div>)
}

SettersBlock.propTypes = {
    setters: PropTypes.array.isRequired,
    setState: PropTypes.func.isRequired,
    tabIndexOffset: PropTypes.number,
}

SettersBlock.defaultProps = {
    tabIndexOffset: 1,
}
