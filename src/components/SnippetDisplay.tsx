import * as React from 'react'
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

const SnippetTabPane = (
  { snippet, active }: { snippet: ISnippet, active: boolean }
) => {
  return (
    <div id={ `${snippet.title}-tab-pane` }
         className={ 'tab-pane' + (active ? ' active' : '') }>
      { snippet.body }
    </div>
  )
}

interface SnippetDisplayProps {
  snippets: ISnippet[]
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
          <SnippetTabPane snippet={ firstSnippet } active={ true } />
          { otherSnippets.map((snippet) => (
              <SnippetTabPane key={ `${snippet.title}-tab-pane` }
                              snippet={ snippet } active={ false } />
            ))}
        </div>
      </div>
    )
  }
}

export default SnippetDisplay
