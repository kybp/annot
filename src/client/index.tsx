import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import { createStore } from 'redux'
import NavBar from './components/NavBar'
import NewUpload from './components/NewUpload'
import FetchedUpload from './components/FetchedUpload'
import reducer from './reducers'

const App = ({ children }: { children: JSX.Element[] }) => (
  <div>
    <NavBar />

    <div className="container">
      { children }
    </div>
  </div>
)

render(
  <Provider store={ createStore(reducer) }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute                component={ NewUpload     } />
        <Route path="/uploads/:id" component={ FetchedUpload } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'))
