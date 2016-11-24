import * as React from 'react'
import { connect } from 'react-redux'
import { Snippet } from '../reducers/snippets'
import AnnotationForm from './AnnotationForm'
import SnippetSelectionPicker from './SnippetSelectionPicker'
import SnippetForm from './SnippetForm'
import UploadButton from './UploadButton'

interface AppProps {
  snippets: Snippet[]
}

class UploadControls extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SnippetForm    />
        <AnnotationForm />
        <UploadButton   />
      </div>
    )
  }
}

class App extends React.Component<AppProps, {}> {
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
