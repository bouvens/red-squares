import React from 'react'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as reducers from './reducers'
import RedSquares from './components/RedSquares'

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(thunk))

const App = () => (
    <Provider store={store}>
        <RedSquares />
    </Provider>
)

export default App
