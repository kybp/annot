import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { addAnnotation } from '../actions'
import { SnippetSelections } from '../reducers/selections'

declare var $: any

interface Props {
  selections?: SnippetSelections
  dispatch?:   (action: any) => void
}

interface State {
  body: string
}

class AnnotationForm extends React.Component<Props, State> {
  constructor() {
    super()
    this.state = { body: '' }
  }

  componentDidMount() {
    $(findDOMNode(this)).on('shown.bs.modal',  this.initialFocus)
    $(findDOMNode(this)).on('hidden.bs.modal', this.clearFields.bind(this))
  }

  componentWillUnmount() {
    $(findDOMNode(this)).off('shown.bs.modal',  this.initialFocus)
    $(findDOMNode(this)).off('hidden.bs.modal', this.clearFields.bind(this))
  }

  initialFocus() {
    document.getElementById('annotation-body-input').focus()
  }

  clearFields() {
    this.setState({ body: '' })
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.dispatch(addAnnotation({
      body:       this.state.body,
      selections: this.props.selections
    }))
    this.clearFields()
  }

  updateBody(event: any) {
    this.setState({ body: event.target.value })
  }

  render() {
    return (
      <div>
        <button data-toggle="modal" data-target="#annotation-modal"
                className="btn btn-primary">
          Add annotation
        </button>

        <div id="annotation-modal" className="modal fade" tabIndex={ -1 }>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">New annotation</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input type="text" className="form-control"
                           id="annotation-body-input"
                           placeholder="Annotation"
                           value={ this.state.body }
                           onChange={ this.updateBody.bind(this) } />
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

const mapStateToProps = (
  { selections }: { selections: SnippetSelections },
  ownProps: Props
): Props => {
  return Object.assign({}, ownProps, { selections })
}

export default connect(mapStateToProps)(AnnotationForm)
