import * as React from 'react'
import { connect } from 'react-redux'
import { addSelection } from '../actions'
import { ISnippet } from './Snippet'

/*
 * Using snippet titles directly in id's like this trusts the user to be very
 * well-behaved. Just a temporary solution.
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
  snippet:  ISnippet
  active:   boolean
  dispatch: (action: any) => void
}

class SnippetTabPane extends React.Component<SnippetTabPaneProps, {}> {
  handleMouseUp() {
    const selection = window.getSelection()
    if (! selection.isCollapsed) {
      const start = Math.min(selection.anchorOffset, selection.focusOffset)
      const end   = Math.max(selection.anchorOffset, selection.focusOffset)

      this.props.dispatch(addSelection({
        snippet: this.props.snippet,
        start, end
      }))
    }
  }

  render() {
    return (
      <div id={ `${this.props.snippet.title}-tab-pane` }
           className={ 'tab-pane' + (this.props.active ? ' active' : '') }
           onMouseUp={ this.handleMouseUp.bind(this) }>
        { this.props.snippet.body }
      </div>
    )
  }
}

interface SnippetDisplayProps {
  snippets:  ISnippet[]
  dispatch?: (action: any) => void
}

class SnippetDisplay extends React.Component<SnippetDisplayProps, {}> {
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
                          dispatch={ this.props.dispatch }/>
          { otherSnippets.map((snippet) => (
              <SnippetTabPane key={ `${snippet.title}-tab-pane` }
                              snippet={ snippet } active={ false }
                              dispatch={ this.props.dispatch }/>
            ))}
        </div>
      </div>
    )
  }
}

export default connect()(SnippetDisplay)
