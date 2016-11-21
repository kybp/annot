import * as React from 'react'
import { HighlightSelection } from '../reducers/selections'

interface Props {
  snippetId:  string,
  body:       string,
  selections: HighlightSelection[],
}

/**
 * A component for displaying the body of a snippet with its selections
 * highlighted in a different colour.
 */
class SnippetDisplay extends React.Component<Props, {}> {
  render() {
    const body = this.props.body
    const chunks: any[] = []

    let last = 0
    this.props.selections.forEach((selection) => {
      if (selection.start !== last) {
        chunks.push(
          <span key={ `${this.props.snippetId}-${last}-${selection.start}` }>
            { body.slice(last, selection.start) }
          </span>
        )
      }

      chunks.push(
        <mark key={
          `${this.props.snippetId}-${selection.start}-${selection.end}` }>
          { body.slice(selection.start, selection.end) }
        </mark>
      )

      last = selection.end
    })

    if (last !== body.length) {
      chunks.push(
        <span key={ `${this.props.snippetId}-last` }>
          { body.slice(last, body.length) }
        </span>
      )
    }

    return <div>{ chunks }</div>
  }
}

export default SnippetDisplay
