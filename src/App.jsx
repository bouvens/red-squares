import React, { StrictMode } from 'react'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as reducers from './reducers'
import RedSquares from './components/RedSquares'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)))

const App = () => (
  <StrictMode>
    <Provider store={store}>
      <RedSquares />
    </Provider>
  </StrictMode>
)

export default App
