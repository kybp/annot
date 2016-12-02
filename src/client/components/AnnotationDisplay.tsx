import * as React from 'react'
import { Annotation } from '../../models'

interface Props {
  annotation: Annotation
}

class AnnotationDisplay extends React.Component<Props, {}> {
  render() {
    return (
      <div className="card" style={{ height: '100%' }}>
        <div className="card-header">
          { this.props.annotation.title }
        </div>
        <div className="card-block">
          <div className="card-text">
            { this.props.annotation.body }
          </div>
        </div>
      </div>
    )
  }
}

export default AnnotationDisplay
