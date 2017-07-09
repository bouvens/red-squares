import React from 'react'
import PropTypes from 'prop-types'

export const Connector = (props) => {
    const { children, ...passedProps } = props

    return (
        <div className="controlled-connector">
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
