import _ from 'lodash'
import * as types from '../constants/actionTypes'

export const setState = (name, value) => ({
    type: types.SET_STATE,
    data: _.set({}, name, value)
})
