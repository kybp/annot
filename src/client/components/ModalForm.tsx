import * as _ from 'lodash'
import * as React from 'react'
import { findDOMNode } from 'react-dom'

declare var $: any

interface Props {
  title:    string,
  onSubmit: (title: string, body: string) => void
}

interface State {
  title: string,
  body:  string
}

/**
 * A button that, when clicked, will display a modal form prompting
 * the user for a title and a body. The `title` prop will be displayed
 * both on the button and at the top of the form.
 */
class ModalForm extends React.Component<Props, State> {
  private modalId:      string
  private titleInputId: string

  constructor() {
    super()
    this.state        = { title: '', body: '' }
    this.modalId      = _.uniqueId("modal-form-modal-")
    this.titleInputId = _.uniqueId("modal-form-title-input-")
  }

  componentDidMount() {
    $(findDOMNode(this)).on('shown.bs.modal',  this.initialFocus.bind(this))
    $(findDOMNode(this)).on('hidden.bs.modal', this.clearFields.bind(this))
  }

  componentWillUnmount() {
    $(findDOMNode(this)).off('shown.bs.modal',  this.initialFocus.bind(this))
    $(findDOMNode(this)).off('hidden.bs.modal', this.clearFields.bind(this))
  }

  initialFocus() {
    document.getElementById(this.titleInputId).focus()
  }

  clearFields() {
    this.setState({ title: '', body: '' })
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.title, this.state.body)
    this.clearFields()
  }

  handleChangeFor(slot: string) {
    return (event: any) => {
      this.setState({ [slot]: event.target.value } as State)
    }
  }

  render() {
    return (
      <div>
        <button data-toggle="modal" data-target={ `#${ this.modalId }` }
                className="btn btn-primary">
          { this.props.title }
        </button>

        <div id={ this.modalId } className="modal fade" tabIndex={ -1 }>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">{ this.props.title }</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input type="text" className="form-control"
                           id={ this.titleInputId }
                           placeholder="Title"
                           value={ this.state.title }
                           onChange={ this.handleChangeFor('title') } />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control"
                              placeholder="Body"
                              value={ this.state.body }
                              onChange={ this.handleChangeFor('body') } />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={ this.clearFields.bind(this) }
                        data-dismiss="modal"
                        className="btn btn-default">
                  Cancel
                </button>
                <button onClick={ this.handleSubmit.bind(this) }
                        data-dismiss="modal"
                        className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalForm
