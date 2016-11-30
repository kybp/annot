import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { createStore } from 'redux'
import NewUpload from './components/NewUpload'
import FetchedUpload from './components/FetchedUpload'
import reducer from './reducers'

render(
  <Provider store={ createStore(reducer) }>
    <div className="container">
      <Router history={ hashHistory }>
        <Route path="/"            component={ NewUpload     } />
        <Route path="/uploads/:id" component={ FetchedUpload } />
      </Router>
    </div>
  </Provider>,
  document.getElementById('root'))
