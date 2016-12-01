import * as React from 'react'
import { connect } from 'react-redux'
import { selectAnnotation } from '../actions'
import { Annotation } from '../models'

interface Props {
  currentAnnotation?: Annotation
  annotations?:       Annotation[]
  dispatch?:          (action: any) => void
}

class AnnotationsDisplay extends React.Component<Props, {}> {
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
      <div style={{ display: 'flex' }}>
        <div className="card" style={{
          flexGrow:     7,
          marginBottom: 0
        }}>
          <div className="card-header">
            { this.props.currentAnnotation.title }
          </div>
          <div className="card-block">
            <div className="card-text">
              { this.props.currentAnnotation.body }
            </div>
          </div>
        </div>
        <div className="list-group" style={{
          flexGrow:  1,
          overflowY: 'scroll'
        }}>
          { this.props.annotations.map((annotation, index) => (
              <a className={ this.listGroupItemClass(annotation.id) }
                 onClick={ () => this.selectAnnotation(annotation) }
                 href="#" key={ index }>
                { annotation.title }
              </a>
            ))}
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
    annotations,
    currentAnnotation: annotations.find((annotation) => (
      annotation.id === currentAnnotation)
    ) || { title: 'No annotation selected', body: '' }
  })
}

export default connect(mapStateToProps)(AnnotationsDisplay)
