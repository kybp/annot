import * as React from 'react'
import { connect } from 'react-redux'
import { addAnnotation, addSnippet } from '../actions'
import { SnippetSelections } from '../reducers/selections'
import ModalForm from './ModalForm'
import UploadButton from './UploadButton'

interface Props {
  dispatch?:   (action: any) => void
  selections?: SnippetSelections
}

class UploadControls extends React.Component<Props, {}> {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ModalForm title="Add snippet" onSubmit={ (title, body) => {
            this.props.dispatch(addSnippet({ title, body }))
          }} />
        <ModalForm title="Add annotation" onSubmit={ (title, body) => {
            this.props.dispatch(addAnnotation(
              title, { body, selections: this.props.selections }))
          }} />
        <UploadButton />
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

export default connect(mapStateToProps)(UploadControls)
