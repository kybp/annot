import * as _ from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { selectAnnotation } from '../actions'
import { HighlightSelection, SnippetSelections } from '../models'
import { Annotation } from '../models'

interface Props {
  currentAnnotation?: Annotation
  annotations?:       Annotation[]
  pendingSelections?: boolean
  dispatch?:          (action: any) => void
}

class AnnotationSelector extends React.Component<Props, {}> {
  listGroupItemClass(id: string) {
    return 'list-group-item ' + (
      id === this.props.currentAnnotation.id ?
      'active' : 'list-group-item-action'
    )
  }

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
            <a className={ this.listGroupItemClass(annotation.id) }
               onClick={ () => this.selectAnnotation(annotation) }
               style={{ padding: '.25rem 1.25rem' }}
               href="#" key={ index }>
              { annotation.title }
            </a>
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
