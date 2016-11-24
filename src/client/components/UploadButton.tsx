import * as React from 'react'
import { connect } from 'react-redux'
import { doUpload } from '../actions'

interface Props {
  dispatch?: (action: any) => void
}

class UploadButton extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <button onClick={ () => this.props.dispatch(doUpload()) }
                className="btn btn-success">
          Upload
        </button>
      </div>
    )
  }
}

export default connect()(UploadButton)
