import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

class App extends React.Component<{}, {}> {
  render() {
    return <h1>Hi...</h1>
  }
}

render(
  <Provider store={ createStore((x: any) => x) }>
    <App />
  </Provider>,
  document.getElementById('root'))
