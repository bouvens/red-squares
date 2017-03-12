import _ from 'lodash'
import * as types from '../constants/actionTypes'

export function setState (name, value) {
    return (dispatch) => {
        dispatch({
            type: types.SET_STATE,
            data: _.set({}, name, value)
        })
    }
}
