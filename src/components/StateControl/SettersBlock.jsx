import React, { PropTypes } from 'react'

const Setter = (props) => (
    <div className="setter">
        <a onClick={props.onClick} tabIndex={props.tabIndex}>{props.text}</a>
    </div>
)

Setter.propTypes = {
    text: PropTypes.string,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func,
}

export const SettersBlock = (props) => (
    <div>
        {props.setters.map((setter, index) => (
            <Setter
                onClick={() => props.setState(setter.params)}
                key={index}
                tabIndex={index + props.tabIndexOffset}
                text={setter.text}
            />
        ))}
    </div>
)

SettersBlock.propTypes = {
    setters: PropTypes.array.isRequired,
    setState: PropTypes.func.isRequired,
    tabIndexOffset: PropTypes.number,
}

SettersBlock.defaultProps = {
    tabIndexOffset: 1,
}
