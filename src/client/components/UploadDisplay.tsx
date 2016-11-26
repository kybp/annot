import * as React from 'react'
import { connect } from 'react-redux'
import { addSnippet, addSelection, clearSnippets } from '../actions'
import { Snippet } from '../reducers/snippets'
import { SnippetSelections } from '../reducers/selections'
import SnippetsDisplay from './SnippetsDisplay'

interface Props {
  params:     { [key: string]: string }
  snippets:   Snippet[]
  selections: SnippetSelections
  dispatch?:  (action: any) => void
}

class UploadDisplay extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.dispatch(clearSnippets())

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const { snippets, snippetSelections } = JSON.parse(xhr.responseText)

          snippets.forEach((snippet: Snippet) => {
            this.props.dispatch(addSnippet(snippet))
          })

          for (let { snippetId, selections } of snippetSelections) {
            for (let { start, end } of selections) {
              this.props.dispatch(addSelection({
                snippetId, start, end
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
    return <SnippetsDisplay snippets={ this.props.snippets }
                            selectable={ false } />
  }
}

const mapStateToProps = (
  { snippets, selections }: { snippets: Snippet[], selections: SnippetSelections},
  ownProps: Props
): Props => {
  return Object.assign({}, ownProps, { snippets, selections })
}

export default connect(mapStateToProps)(UploadDisplay)
