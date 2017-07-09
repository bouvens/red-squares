import _ from 'lodash'

export const noOperation = () => {}

export const extendConnection = (props, IDS) =>
    (state) => _.extend(
        props(state),
        _.mapValues(IDS, (id) => _.get(state, id))
    )
export const mapStateToIds = (state, IDS) => _.mapValues(_.invert(IDS), (id) => state[id])
