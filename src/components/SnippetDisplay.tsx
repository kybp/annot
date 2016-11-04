import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { addSelection } from '../actions'
import { ISnippet } from './Snippet'

declare var $: any

/*
 * Using snippet titles directly in id's like this trusts the user to be very
 * well-behaved. Just a temporary solution.
 */

export type SelectionState = {
  [key: string]: { start: number, end: number }[]
}

const SnippetNavItem = (
  { title, active }: { title: string, active: boolean }
) => {
  return (
    <li className="nav-item">
      <a className={ 'nav-link' + (active ? ' active' : '') }
         data-toggle="tab" href={ `#${title}-tab-pane` }>
        { title }
      </a>
    </li>
  )
}

interface SnippetTabPaneProps {
  snippet:    ISnippet
  active:     boolean
  selections: { start: number, end: number }[]
  dispatch:   (action: any) => void
}

class SnippetTabPane extends React.Component<SnippetTabPaneProps, {}> {
  /**
   * Convert a Selection into a tuple of start and end indexes into the 
   * snippet body, indicating the half-open range that is to be selected.
   *
   * @param selection  The selection to convert
   * @returns  Start and end indexes into the node's text
   */
  findOffsets(selection: Selection): [number, number] {
    const node  = $(findDOMNode(this))
    const start = Math.min(selection.anchorOffset, selection.focusOffset)
    const end   = Math.max(selection.anchorOffset, selection.focusOffset)
    return [start, end]
  }

  handleMouseUp() {
    const selection = window.getSelection()

    if (! selection.isCollapsed) {
      const [start, end] = this.findOffsets(selection);
      this.props.dispatch(addSelection({
        snippet: this.props.snippet,
        start, end
      }))
    }
  }

  prepareBody() {
    const body = this.props.snippet.body
    const result: any[] = []
    let last = 0
    this.props.selections.forEach((selection) => {
      if (selection.start !== last) {
        result.push(
          <span>
            { body.slice(last, selection.start) }
          </span>
        )
      }
      result.push(
        <mark>
          { body.slice(selection.start, selection.end) }
        </mark>
      )

      last = selection.end
    })

    if (last !== body.length) {
      result.push(<span>{ body.slice(last, body.length) }</span>)
    }

    return result
  }

  render() {
    return (
      <div id={ `${this.props.snippet.title}-tab-pane` }
           className={ 'tab-pane' + (this.props.active ? ' active' : '') }
           onMouseUp={ this.handleMouseUp.bind(this) }>
        { this.prepareBody() }
      </div>
    )
  }
}

interface SnippetDisplayProps {
  snippets:    ISnippet[]
  selections?: SelectionState
  dispatch?:   (action: any) => void
}

class SnippetDisplay extends React.Component<SnippetDisplayProps, {}> {
  selectionsFor(snippet: ISnippet) {
    return this.props.selections[snippet.title]
  }

  render() {
    if (this.props.snippets.length === 0) return <h1>Empty !</h1>

    const firstSnippet  = this.props.snippets[0]
    const otherSnippets = this.props.snippets.slice(1)

    return (
      <div className="card text-xs-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs pull-xs-left">
            <SnippetNavItem title={ firstSnippet.title } active={ true } />
            { otherSnippets.map(({ title }) => (
                <SnippetNavItem key={ title + '-nav-item' }
                                title={ title } active={ false } />
              ))}
          </ul>
        </div>
        <div className="card-block tab-content">
          <SnippetTabPane snippet={ firstSnippet } active={ true }
                          selections={ this.selectionsFor(firstSnippet) }
                          dispatch={ this.props.dispatch }/>
          { otherSnippets.map((snippet) => (
              <SnippetTabPane key={ `${snippet.title}-tab-pane` }
                              snippet={ snippet } active={ false }
                              selections={ this.selectionsFor(snippet) }
                              dispatch={ this.props.dispatch }/>
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (
  { selections }: { selections: SelectionState },
  ownProps: SnippetDisplayProps
): SnippetDisplayProps => {
  return Object.assign({}, ownProps, { selections })
}

export default connect(mapStateToProps)(SnippetDisplay)
