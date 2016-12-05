import * as React from 'react'
import { connect } from 'react-redux'
import { Annotation } from '../../models'
import AnnotationDisplay from './AnnotationDisplay'
import AnnotationSelector from './AnnotationSelector'
import SnippetsDisplay from './SnippetsDisplay'

interface Props {
  selectable:  boolean
  annotation?: Annotation
}

class UploadDisplay extends React.Component<Props, {}> {
  render() {
    return (
      <div style={{ display: 'flex', height: '80vh' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
            <SnippetsDisplay selectable={ this.props.selectable } />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AnnotationDisplay annotation={ this.props.annotation } />
          </div>
        </div>
        <div style={{ width: '20%', overflowY: 'scroll', whiteSpace: 'nowrap',
                      border: '1px solid rgba(0, 0, 0, .125)' }}>
          <AnnotationSelector />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (
  { currentAnnotation, annotations }:
  { currentAnnotation: string, annotations: Annotation[] },
  ownProps: Props
): Props => {
  return Object.assign({}, ownProps, {
    annotation: annotations.find((annotation: Annotation) => (
      annotation.id === currentAnnotation
    )) || { title: '', body: '' }
  })
}

export default connect(mapStateToProps)(UploadDisplay)
