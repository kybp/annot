import * as React from 'react'
import { connect } from 'react-redux'
import { addAnnotation, addSnippet, addSelection } from '../actions'
import { clearSnippets } from '../actions'
import { Annotation, Snippet } from '../../models'
import UploadDisplay from './UploadDisplay'

interface Props {
  params:    { [key: string]: string }
  dispatch?: (action: any) => void
}

class FetchedUpload extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.dispatch(clearSnippets())

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const { snippets, annotations, snippetSelections } =
            JSON.parse(xhr.responseText)

          snippets.forEach((snippet: Snippet) => {
            this.props.dispatch(addSnippet(snippet))
          })

          annotations.forEach((annotation: Annotation) => {
            this.props.dispatch(addAnnotation(annotation))
          })

          for (let snippetId of Object.keys(snippetSelections)) {
            const selections = snippetSelections[snippetId]
            for (let { annotationId, start, end } of selections) {
              this.props.dispatch(addSelection({
                annotationId, snippetId, start, end
              }))
            }
          }
        } else {
          console.log(`error (${xhr.status}): ${xhr.responseText}`)
        }
      }
    }
    xhr.open('GET', `/api/uploads/${this.props.params['id']}`)
    xhr.send()
  }

  render() {
    return <UploadDisplay selectable={ false } />
  }
}

export default connect()(FetchedUpload)
