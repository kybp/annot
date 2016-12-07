import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { addSelection } from '../actions'
import { Snippet } from '../../models'
import { HighlightSelection, SnippetSelections } from '../../models'
import SnippetBodyDisplay from './SnippetBodyDisplay'

/**
 * A nav-item for linking a snippet's title tab to its body pane.
 */
const SnippetNavItem = (
  { snippetId, title, active }:
  { snippetId: string, title: string, active: boolean }
) => {
  return (
    <li className="nav-item">
      <a className={ 'nav-link' + (active ? ' active' : '') }
         data-toggle="tab" href={ `#${snippetId}-tab-pane` }>
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
        snippetId:    this.props.snippet.id,
        annotationId: null,
        start, end
      }))
    }
  }

  render() {
    return (
      <div id={ `${this.props.snippet.id}-tab-pane` }
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

interface SnippetsDisplayProps {
  selectable:  boolean
  snippets?:   Snippet[]
  selections?: SnippetSelections
  dispatch?:   (action: any) => void
  currentAnnotationId?: string
}

/**
 * A container for displaying snippets and allowing the user to make
 * selections from the snippet bodies.
 */
class SnippetsDisplay extends React.Component<SnippetsDisplayProps, {}> {
  selectionsFor(snippet: Snippet) {
    return (this.props.selections[snippet.id] || [])
      .filter(selection => {
        return selection.annotationId === this.props.currentAnnotationId
      })
  }

  render() {
    if (this.props.snippets.length === 0) {
      return (
        <div className="card" style={{ overflow: 'auto', height: '100%',
                                       marginBottom: 0 }}>
          <div className="card-header">
          </div>
          <div className="card-block">
            Add some snippets to get started. Then highlight some relevant
            parts, and add annotations explaining them. Once you're ready,
            hit Upload so you can share it with the world.
          </div>
        </div>
      )
    }

    const firstSnippet  = this.props.snippets[0]
    const otherSnippets = this.props.snippets.slice(1)

    return (
      <div className="card" style={{ height: '100%', paddingBottom: '53px' }}>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs pull-xs-left">
            <SnippetNavItem
                snippetId={ firstSnippet.id } title={ firstSnippet.title }
                active={ true } />
            { otherSnippets.map(({ id, title }, i) => (
                <SnippetNavItem
                    snippetId={ id } title={ title }
                    key={ i } active={ false } />
              ))}
          </ul>
        </div>
        <div className="card-block tab-content"
             style={{ height: '100%', overflow: 'auto' }}>
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
  { snippets, selections, currentAnnotation }:
  { snippets: Snippet[], selections: SnippetSelections, currentAnnotation: string },
  ownProps: SnippetsDisplayProps
): SnippetsDisplayProps => {
  return Object.assign({}, ownProps, {
    currentAnnotationId: currentAnnotation,
    snippets, selections
  })
}

export default connect(mapStateToProps)(SnippetsDisplay)
