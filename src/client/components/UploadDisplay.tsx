import * as React from 'react'
import { connect } from 'react-redux'
import { addSnippet, addSelection } from '../actions'
import { Snippet } from '../reducers/snippets'
import { SnippetSelections } from '../reducers/selections'
import SnippetDisplay from './SnippetDisplay'

interface Props {
  params:     { [key: string]: string },
  dispatch?:  (action: any) => void,
  snippets:   Snippet[],
  selections: SnippetSelections
}

class UploadDisplay extends React.Component<Props, {}> {
  componentWillMount() {
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
    return (
      <div>{ this.props.snippets.map((snippet) => (
        <div key={ `${snippet.title}-div` }>
          <h1>{ snippet.title }</h1>
          <SnippetDisplay
              key={ `${snippet.title}-display` }
              snippetId={ snippet.title }
              body={ snippet.body }
              selections={ this.props.selections[snippet.title] } />
        </div>))}
      </div>
    )
  }
}

const mapStateToProps = (
  { snippets, selections }: { snippets: Snippet[], selections: SnippetSelections},
  ownProps: Props
): Props => {
  return Object.assign({}, ownProps, { snippets, selections })
}

export default connect(mapStateToProps)(UploadDisplay)
