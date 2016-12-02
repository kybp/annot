import * as React from 'react'
import { connect } from 'react-redux'
import { addAnnotation, addSnippet } from '../actions'
import { Annotation, Snippet, SnippetSelections } from '../../models'
import ModalForm from './ModalForm'

interface Props {
  dispatch?:   (action: any) => void
  selections?: SnippetSelections
  uploadJson?: any
}

class UploadControls extends React.Component<Props, {}> {
  doUpload() {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status === 201) {
          console.log(`response: ${xhr.responseText}`)
          const json = JSON.parse(xhr.responseText)
          window.location.href = `/uploads/${json.id}`
        } else {
          console.log(`error (${xhr.status}): ${xhr.responseText}`)
        }
      }
    }
    xhr.open('POST', '/api/uploads')
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(this.props.uploadJson))
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ModalForm title="Add snippet" onSubmit={ (title, body) => {
            this.props.dispatch(addSnippet({ title, body }))
          }} />
        <ModalForm title="Add annotation" onSubmit={ (title, body) => {
            this.props.dispatch(addAnnotation({ title, body }))
          }} />
        <div>
          <button onClick={ () => this.doUpload() }
                  className="btn btn-success">
            Upload
          </button>
        </div>
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

export default connect(mapStateToProps)(UploadControls)
