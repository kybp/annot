import * as _ from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { selectAnnotation, removeAnnotation } from '../actions'
import { HighlightSelection, SnippetSelections } from '../../models'
import { Annotation } from '../../models'

type ChoiceProps = {
  annotation: Annotation
  selected:   boolean
  editable:   boolean
  dispatch:   (action: any) => void
  pendingSelections: boolean
}

type State = {
  hover: boolean
}

class AnnotationChoice extends React.Component<ChoiceProps, State> {

  constructor() {
    super()
    this.state = { hover: false }
  }

  handleMouseOver() {
    if (this.props.editable) {
      this.setState({ hover: true })
    }
  }

  handleMouseOut() {
    this.setState({ hover: false })
  }

  /**
   * A handler function for setting the currently selected annotation
   * in the Redux store when an annotation choice is clicked. If there
   * are pending selections, this will instead tell the user to save
   * them first.
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
      <button className={ 'list-group-item list-group-item-action ' + (
          this.props.selected ? 'active' : ''
        )}
              onMouseOver={ this.handleMouseOver.bind(this) }
              onMouseOut={ this.handleMouseOut.bind(this) }
              onClick={ () => this.selectAnnotation(this.props.annotation) }
              style={{ padding: '.25rem 1.25rem' }}>
        { this.props.annotation.title }
        { <span className="tag tag-danger pull-xs-right"
                style={{ display: this.state.hover ? 'inline' : 'none' }}
                onClick={ () => {
                    this.props.dispatch(
                      removeAnnotation(this.props.annotation.id)
                    )
                  }}>
          &times;
        </span>
        }
      </button>
    )
  }

}

type Props = {
  editable: boolean
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
class AnnotationSelector extends React.Component<Props, State> {

  render() {
    return (
      <div className="list-group">
        { this.props.annotations.map((annotation, index) => (
            <AnnotationChoice
                key={ index }
                annotation={ annotation }
                selected={ annotation.id === this.props.currentAnnotation.id }
                dispatch={ this.props.dispatch }
                editable={ this.props.editable }
                pendingSelections={ this.props.pendingSelections } />
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
