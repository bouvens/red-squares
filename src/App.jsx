import React from 'react'
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as reducers from './reducers'
import RedSquares from './components/RedSquares'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
    || compose
const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)))

const App = () => (
    <Provider store={store}>
        <RedSquares />
    </Provider>
)

export default App
