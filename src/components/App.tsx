import * as React from 'react'
import { connect } from 'react-redux'
import SnippetForm from './SnippetForm'
import { ISnippet } from './Snippet'

interface AppProps {
  snippets: ISnippet[]
}

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div>
        <SnippetForm />
        { this.props.snippets.map(({ title, body }) => (
            <div key={ title }>
              <h1>{ title }</h1>
              <p>{ body }</p>
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = ({ snippets }: { snippets: ISnippet[] }) => ({
  snippets
})

export default connect(mapStateToProps)(App)
