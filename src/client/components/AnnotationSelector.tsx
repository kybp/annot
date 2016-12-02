import * as React from 'react'
import { connect } from 'react-redux'
import { selectAnnotation } from '../actions'
import { Annotation } from '../models'

interface Props {
  currentAnnotation?: Annotation
  annotations?:       Annotation[]
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
    this.props.dispatch(selectAnnotation(annotation.id))
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
  { currentAnnotation, annotations }:
  { currentAnnotation: string, annotations: Annotation[] },
  ownProps: Props
): Props => {
  return Object.assign({}, ownProps, {
    annotations,
    currentAnnotation: annotations.find((annotation) => (
      annotation.id === currentAnnotation)
    ) || { title: 'No annotation selected', body: '' }
  })
}

export default connect(mapStateToProps)(AnnotationSelector)
