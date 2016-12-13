import * as _ from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { selectAnnotation } from '../actions'
import { HighlightSelection, SnippetSelections } from '../../models'
import { Annotation } from '../../models'

interface Props {
  currentAnnotation?: Annotation
  annotations?:       Annotation[]
  pendingSelections?: boolean
  dispatch?:          (action: any) => void
}

/**
 * A component for showing the user the list of annotations for the
 * current upload, and allowing them to select an annotation to
 * view. Once an annotation has been selected, there is currently no
 * way for the user to unselect an annotation, only to select a
 * different one.
 */
class AnnotationSelector extends React.Component<Props, {}> {

  /**
   * Return the CSS class to give an annotation's list item, allowing
   * the currently selected annotation to be styled differently. In
   * the future, this function will not be needed as a different
   * component will be used for displaying the current annotation,
   * letting us easily unselect an annotation when the active one is
   * clicked.
   */
  listGroupItemClass(id: string) {
    return 'list-group-item list-group-item-action ' + (
      id === this.props.currentAnnotation.id ? 'active' : ''
    )
  }

  /**
   * A handler function for setting the currently selected annotation
   * in the Redux store when an annotation in the list is clicked. If
   * there are pending selections, this will instead tell the user to
   * save them first.
   */
  selectAnnotation(annotation: Annotation) {
    if (this.props.pendingSelections) {
      alert('Please save pending selections before selecting an annotation')
    } else {
      this.props.dispatch(selectAnnotation(annotation.id))
    }
  }

  render() {
    return (
      <div className="list-group">
        { this.props.annotations.map((annotation, index) => (
            <button className={ this.listGroupItemClass(annotation.id) }
                    onClick={ () => this.selectAnnotation(annotation) }
                    style={{ padding: '.25rem 1.25rem' }}
                    key={ index }>
              { annotation.title }
            </button>
          ))}
      </div>
    )
  }
}

const mapStateToProps = (
  { currentAnnotation, annotations, selections }:
  { currentAnnotation: string, annotations: Annotation[],
    selections: SnippetSelections },
  ownProps: Props
): Props => {
  return Object.assign({}, ownProps, {
    annotations,
    currentAnnotation: annotations.find((annotation) => (
      annotation.id === currentAnnotation)
    ) || { title: 'No annotation selected', body: '' },
    pendingSelections: _.toPairs(selections).some(([snippetId, selections]) => (
      selections.some((selection: HighlightSelection) => (
        selection.annotationId === null)
    )))
  })
}

export default connect(mapStateToProps)(AnnotationSelector)
