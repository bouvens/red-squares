import React, { PropTypes } from 'react'

export const Connector = (props) => {
    const { children, ...passedProps } = props

    return (
        <div>
            {React.Children.map(
                children,
                (child) => (
                    typeof child.type === 'function' ?
                        <child.type
                            {...passedProps}
                            {...child.props}
                        /> :
                        child
                )
            )}
        </div>
    )
}

Connector.propTypes = {
    children: PropTypes.array.isRequired,
}
