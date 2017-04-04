import React, { PropTypes } from 'react'
import { noOperation } from './utils'

export const Connector = ({ children, state, onChange, onClick, onFocus }) => (
    <div>
        {React.Children.map(
            children,
            (child) => (
                typeof child.type === 'function'
                    ? React.cloneElement(child, {
                        state,
                        onChange,
                        onClick,
                        onFocus,
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
