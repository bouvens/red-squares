import React from 'react'
import ControlledComponent from './ControlledComponent'
import InnerInput from './InnerInput'

const Input = (props) => (
    <ControlledComponent {...props} >
        <InnerInput />
    </ControlledComponent>
)

export default Input
