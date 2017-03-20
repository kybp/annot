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

/**
 * A component for displaying an entire upload to the user, consisting
 * of its snippets and annotations, with means for selecting between
 * both. All state concerning what to display is retrieved from the
 * Redux store. The `selectable` prop indicates whether the user
 * should be able to add new selections, snippets, and annotations;
 * for displaying an upload while it is still being worked on, it
 * should be true, and for displaying a fetched upload from the
 * database it should be set to false.
 */
class UploadDisplay extends React.Component<Props, {}> {
  render() {
    return (
      <div className="upload-display">
        <div className="main-display-container">
          <div className="snippet-display-container">
            <SnippetsDisplay selectable={ this.props.selectable } />
          </div>
          <div className="annotation-display-container">
            <AnnotationDisplay annotation={ this.props.annotation } />
          </div>
        </div>
        <div className="annotation-selector-container">
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
