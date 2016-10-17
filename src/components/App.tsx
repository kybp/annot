import * as React from 'react'
import { connect } from 'react-redux'
import { ISnippet } from './Snippet'
import SnippetDisplay from './SnippetDisplay'
import SnippetForm from './SnippetForm'

interface AppProps {
  snippets: ISnippet[]
}

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div>
        <h1>Upload</h1>
        <SnippetForm />
        <SnippetDisplay snippets={ this.props.snippets } />
      </div>
    )
  }
}

const mapStateToProps = ({ snippets }: { snippets: ISnippet[] }) => ({
  snippets
})

export default connect(mapStateToProps)(App)
