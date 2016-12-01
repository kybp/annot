import * as React from 'react'
import AnnotationsDisplay from './AnnotationsDisplay'
import SnippetsDisplay from './SnippetsDisplay'

interface Props {
  selectable: boolean
}

class UploadDisplay extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <SnippetsDisplay selectable={ this.props.selectable } />
        <AnnotationsDisplay />
      </div>
    )
  }
}

export default UploadDisplay
