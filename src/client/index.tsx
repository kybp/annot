import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import reducer from './reducers'

render(
  <Provider store={ createStore(reducer) }>
    <div className="container">
      <App />
    </div>
  </Provider>,
  document.getElementById('root'))
