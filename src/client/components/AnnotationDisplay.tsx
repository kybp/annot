import * as React from 'react'
import { Annotation } from '../../models'

interface Props {
  annotation: Annotation
}

/**
 * A component to display its `annotation` prop to the user.
 */
class AnnotationDisplay extends React.Component<Props, {}> {
  render() {
    return (
      <div className="card card-display">
        <div className="card-header">
          { this.props.annotation.title }
        </div>
        <div className="card-block tab-pane-body-container">
          <div className="card-text text-body">
            { this.props.annotation.body }
          </div>
        </div>
      </div>
    )
  }
}

export default AnnotationDisplay
