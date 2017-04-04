import React, { PropTypes } from 'react'

export const Connector = (props) => {
    const { children, ...passedProps } = props

    return (
        <div>
            {React.Children.map(
                children,
                (Child) => (
                    typeof Child.type === 'function' ?
                        <Child.type
                            {...passedProps}
                            {...Child.props}
                        /> :
                        <Child />
                )
            )}
        </div>
    )
}

Connector.propTypes = {
    children: PropTypes.array.isRequired,
}
