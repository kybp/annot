import * as _ from 'lodash'
import * as React from 'react'
import { findDOMNode } from 'react-dom'

declare var $: any

interface Props {
  title:    string
  onSubmit: (title: string, body: string) => void
}

interface State {
  title: string
  body:  string
}

/**
 * A button that, when clicked, will display a modal form prompting
 * the user for a title and a body. The `title` prop will be displayed
 * both on the button and at the top of the form.
 */
class ModalForm extends React.Component<Props, State> {

  /**
   * A generated ID for the modal form. This is needed to link the
   * button's data-target to the actual modal.
   */
  private modalId: string

  /**
   * A generated ID for the modal form's title input ID. This is
   * needed so that we can easily give focus to the title input when
   * the modal is displayed.
   */
  private titleInputId: string

  constructor() {
    super()
    this.state        = { title: '', body: '' }
    this.modalId      = _.uniqueId("modal-form-modal-")
    this.titleInputId = _.uniqueId("modal-form-title-input-")
  }

  /**
   * Set up handlers to give the title input field keyboard focus when
   * the modal is displayed and to empty both of its input fields when
   * it is hidden.
   */
  componentDidMount() {
    $(findDOMNode(this)).on('shown.bs.modal',  this.initialFocus.bind(this))
    $(findDOMNode(this)).on('hidden.bs.modal', this.clearFields.bind(this))
  }

  /**
   * Remove the handlers added in [[componentDidMount]].
   */
  componentWillUnmount() {
    $(findDOMNode(this)).off('shown.bs.modal',  this.initialFocus.bind(this))
    $(findDOMNode(this)).off('hidden.bs.modal', this.clearFields.bind(this))
  }

  /**
   * Give the title input field focus. To be called when the modal
   * form is displayed.
   */
  initialFocus() {
    document.getElementById(this.titleInputId).focus()
  }

  /**
   * Empty both input fields in the form, resetting it to a blank
   * state. To be called when the modal is hidden for any reason.
   */
  clearFields() {
    this.setState({ title: '', body: '' })
  }

  /**
   * A wrapper function around the component's `onSubmit` prop for
   * passing it the current values of our title and body.
   */
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.title, this.state.body)
    this.clearFields()
  }

  /**
   * Return a handler function that will update the given slot in our
   * state. Used to create the onChange handlers for the component's
   * input fields.
   */
  handleChangeFor(slot: string) {
    return (event: any) => {
      this.setState({ [slot]: event.target.value } as State)
    }
  }

  render() {
    return (
      <div>
        <button data-toggle="modal" data-target={ `#${ this.modalId }` }
                className="btn btn-outline-primary">
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
