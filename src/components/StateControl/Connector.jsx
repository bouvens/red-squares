import React, { PropTypes } from 'react'
import { noOperation } from './utils'

export const Connector = (props) => (
    <div>
        {React.Children.map(
            props.children,
            (child) => (
                typeof child.type === 'function'
                    ? React.cloneElement(child, {
                        state: props.state,
                        onChange: props.onChange,
                        onClick: props.onClick,
                        onFocus: props.onFocus,
                    })
                    : child
            )
        )}
    </div>
)

Connector.propTypes = {
    state: PropTypes.object,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    children: PropTypes.array,
}

Connector.defaultProps = {
    state: {},
    onChange: noOperation,
    onClick: noOperation,
    onFocus: noOperation,
}
