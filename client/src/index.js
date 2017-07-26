import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'

import App from './App'
import Reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'

const store = createStore(Reducer, composeWithDevTools(
  applyMiddleware(reduxThunk)
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
