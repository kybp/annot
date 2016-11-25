import * as React from 'react'
import { connect } from 'react-redux'
import { Snippet } from '../reducers/snippets'
import SnippetSelectionPicker from './SnippetSelectionPicker'
import UploadControls from './UploadControls'

interface Props {
  snippets: Snippet[]
}

class App extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Upload</h1>
          <UploadControls />
        </div>
        <SnippetSelectionPicker snippets={ this.props.snippets } />
      </div>
    )
  }
}

const mapStateToProps = ({ snippets }: { snippets: Snippet[] }) => ({
  snippets
})

export default connect(mapStateToProps)(App)
