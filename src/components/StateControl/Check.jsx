import React from 'react'
import ControlledComponent from './ControlledComponent'
import InnerCheck from './InnerCheck'

const Check = (props) => (
    <ControlledComponent {...props} >
        <InnerCheck />
    </ControlledComponent>
)

export default Check
