import * as React from 'react'
import SnippetsDisplay from './SnippetsDisplay'
import UploadControls from './UploadControls'

class NewUpload extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Upload</h1>
          <UploadControls />
        </div>
        <SnippetsDisplay selectable={ true } />
      </div>
    )
  }
}

export default NewUpload
