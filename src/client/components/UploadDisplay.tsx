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
      <div style={{ display: 'flex', height: '80vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column',
                      width: '100%' }}>
          <div style={{ flex: 2 }}>
            <SnippetsDisplay selectable={ this.props.selectable } />
          </div>
          <div style={{ flex: 1 }}>
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
