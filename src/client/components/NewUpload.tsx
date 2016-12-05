import * as React from 'react'
import UploadDisplay from './UploadDisplay'
import UploadControls from './UploadControls'

/**
 * A component for allowing the user to create a new upload and save
 * it to the database.
 */
class NewUpload extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Upload</h1>
          <UploadControls />
        </div>
        <UploadDisplay selectable={ true } />
      </div>
    )
  }
}

export default NewUpload
