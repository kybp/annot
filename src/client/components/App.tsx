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

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div>
        <h1>Upload</h1>
        <SnippetForm    />
        <AnnotationForm />
        <UploadButton   />
        <SnippetSelectionPicker snippets={ this.props.snippets } />
      </div>
    )
  }
}

const mapStateToProps = ({ snippets }: { snippets: Snippet[] }) => ({
  snippets
})

export default connect(mapStateToProps)(App)