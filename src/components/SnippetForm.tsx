import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { addSnippet } from '../actions'
import { ISnippet } from './Snippet'

declare var $: any

interface SnippetFormProps {
  dispatch?: (action: any) => void
}

class SnippetForm extends React.Component<SnippetFormProps, ISnippet> {
  constructor() {
    super()
    this.state = { title: '', body: '' }
  }

  componentDidMount() {
    $(findDOMNode(this)).on('shown.bs.modal', this.initialFocus)
  }

  componentWillUnmount() {
    $(findDOMNode(this)).off('shown.bs.modal', this.initialFocus)
  }

  initialFocus() {
    document.getElementById('snippet-title-input').focus()
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.dispatch(addSnippet({
      title: this.state.title,
      body:  this.state.body
    }))
    this.setState({ title: '', body: '' })
  }

  handleChangeFor(slot: string) {
    return (event: any) => {
      this.setState({ [slot]: event.target.value } as ISnippet)
    }
  }

  render() {
    return (
      <div>
        <button data-toggle="modal" data-target="#snippet-modal"
                className="btn btn-primary">
          Add snippet
        </button>

        <div id="snippet-modal" className="modal fade" tabIndex={ -1 }>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">New snippet</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={ this.handleSubmit.bind(this) }>
                  <div className="form-group">
                    <input type="text" className="form-control"
                           id="snippet-title-input"
                           placeholder="Snippet title"
                           value={ this.state.title }
                           onChange={ this.handleChangeFor('title') } />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control"
                              placeholder="Snippet body"
                              value={ this.state.body }
                              onChange={ this.handleChangeFor('body') }/>
                  </div>
                  <input type="submit" className="btn btn-primary" value="Save" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(SnippetForm)
