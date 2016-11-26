import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { addSelection } from '../actions'
import { Snippet } from '../reducers/snippets'
import { HighlightSelection, SnippetSelections } from '../reducers/selections'
import SnippetBodyDisplay from './SnippetBodyDisplay'

/*
 * Using snippet titles directly in id's like this trusts the user to be very
 * well-behaved. Just a temporary solution.
 */

/**
 * A nav-item for linking a snippet's title tab to its body pane.
 */
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
  snippet:    Snippet
  active:     boolean
  selections: HighlightSelection[]
  selectable: boolean
  dispatch:   (action: any) => void
}

/**
 * A component for displaying a single snippet body and allowing the
 * user to make selections from it by highlighting parts.
 */
class SnippetTabPane extends React.Component<SnippetTabPaneProps, {}> {

  /**
   * Convert a Selection into a tuple of start and end indexes into
   * the snippet body, indicating the half-open range that is to be
   * selected.
   *
   * @param selection  The selection to convert
   * @returns  Start and end indexes into the node's text
   */
  findOffsets(selection: Selection): [number, number] {
    const root   = findDOMNode(this)
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    const children: Node[] = []

    {
      let node: Node
      while (node = walker.nextNode()) children.push(node)
    }

    let i     = 0
    let start = 0

    for (let child of children) {
      if (child === selection.anchorNode) {
        start = i + selection.anchorOffset
      }

      if (child === selection.focusNode) {
        const end = i + selection.focusOffset
        return [Math.min(start, end), Math.max(start, end)]
      }

      i += child.textContent.length
    }
  }

  /**
   * Trigger the check to see if the user highlighted any text, and if
   * so, add that selection to the Redux store.
   */
  handleMouseUp() {
    if (! this.props.selectable) return

    const selection = window.getSelection()

    if (! selection.isCollapsed) {
      const [start, end] = this.findOffsets(selection);
      this.props.dispatch(addSelection({
        snippetId: this.props.snippet.title,
        start, end
      }))
    }
  }

  render() {
    return (
      <div id={ `${this.props.snippet.title}-tab-pane` }
           className={ 'tab-pane' + (this.props.active ? ' active' : '') }
           onMouseUp={ this.handleMouseUp.bind(this) }>
        <SnippetBodyDisplay
            snippetId={ this.props.snippet.title }
            body={ this.props.snippet.body }
            selections={ this.props.selections } />
      </div>
    )
  }
}

interface SnippetBodyDisplayProps {
  snippets:    Snippet[]
  selectable:  boolean
  selections?: SnippetSelections
  dispatch?:   (action: any) => void
}

/**
 * A container for displaying snippets and allowing the user to make
 * selections from the snippet bodies.
 */
class SnippetsDisplay extends React.Component<SnippetBodyDisplayProps, {}> {
  selectionsFor(snippet: Snippet) {
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
            { otherSnippets.map(({ title }, i) => (
                <SnippetNavItem key={ i } title={ title } active={ false } />
              ))}
          </ul>
        </div>
        <div className="card-block tab-content">
          <SnippetTabPane snippet={ firstSnippet } active={ true }
                          selectable={ this.props.selectable }
                          selections={ this.selectionsFor(firstSnippet) }
                          dispatch={ this.props.dispatch }/>
          { otherSnippets.map((snippet, i) => (
              <SnippetTabPane
                  key={ i } snippet={ snippet } active={ false }
                  selectable={ this.props.selectable }
                  selections={ this.selectionsFor(snippet) }
                  dispatch={ this.props.dispatch } />
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (
  { selections }: { selections: SnippetSelections },
  ownProps: SnippetBodyDisplayProps
): SnippetBodyDisplayProps => {
  return Object.assign({}, ownProps, { selections })
}

export default connect(mapStateToProps)(SnippetsDisplay)
