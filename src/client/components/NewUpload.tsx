import * as React from 'react'
import { connect } from 'react-redux'
import { addAnnotation, addSnippet, clearSnippets } from '../actions'
import { addControl, clearControls } from '../actions'
import { Annotation, Snippet, SnippetSelections } from '../../models'
import ModalForm from './ModalForm'
import UploadDisplay from './UploadDisplay'

interface Props {
  dispatch?:   (action: any) => void
  selections?: SnippetSelections
  uploadJson?: any
}

/**
 * A component for allowing the user to create a new upload and save
 * it to the database.
 */
class NewUpload extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.dispatch(addControl(
      <ModalForm title="Add snippet" onSubmit={ (title, body) => {
          this.props.dispatch(addSnippet({ title, body }))
        }} />
    ))

    this.props.dispatch(addControl(
      <ModalForm title="Add annotation" onSubmit={ (title, body) => {
          this.props.dispatch(addAnnotation({ title, body }))
        }} />
    ))

    this.props.dispatch(addControl(
      <button onClick={ () => this.doUpload() }
              className="btn btn-outline-success">
        Upload
      </button>
    ))

  }

  componentWillUnmount() {
    this.props.dispatch(clearControls())
    this.props.dispatch(clearSnippets())
  }

  /**
   * Make an AJAX request to the server to save the current upload
   * state in the database. Once the server responds with 201 created,
   * redirect the user to the newly created upload. To be called when
   * the user presses the upload button.
   *
   * If there is a problem with the AJAX request, this currently
   * simply logs the error to the console and makes no attempt at
   * handling the error.
   */
  doUpload() {
    if (this.props.uploadJson.snippets.length === 0) {
      alert('Please add at least one snippet before uploading')
      return
    }

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status === 201) {
          console.log(`response: ${xhr.responseText}`)
          const json = JSON.parse(xhr.responseText)
          window.location.href = `/uploads/${json.id}`
        } else {
          console.error(`error (${xhr.status}): ${xhr.responseText}`)
        }
      }
    }
    xhr.open('POST', '/api/uploads')
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(this.props.uploadJson))
  }

  render() {
    return (
      <div>
        <UploadDisplay selectable={ true } />
      </div>
    )
  }
}

const mapStateToProps = (
  { snippets, selections, annotations }:
  { annotations: Annotation[]
    selections:  SnippetSelections,
    snippets:    Snippet[],
  }, ownProps: Props
): Props => {
  const uploadJson: any = {
    snippetSelections: selections,
    annotations, snippets
  }
  return Object.assign({}, ownProps, { selections, uploadJson })
}

export default connect(mapStateToProps)(NewUpload)
