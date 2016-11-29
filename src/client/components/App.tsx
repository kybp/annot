import * as React from 'react'
import { connect } from 'react-redux'
import { Snippet } from '../models'
import SnippetsDisplay from './SnippetsDisplay'
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
        <SnippetsDisplay
            currentAnnotationId={ null }
            selectable={ true }
            snippets={ this.props.snippets } />
      </div>
    )
  }
}

const mapStateToProps = ({ snippets }: { snippets: Snippet[] }) => ({
  snippets
})

export default connect(mapStateToProps)(App)
