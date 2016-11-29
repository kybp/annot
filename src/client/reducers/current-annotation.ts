import Actions from '../actions'

const currentAnnotation = (state: string = null, action: any) => {
  switch (action.type) {

  case Actions.CLEAR_CURRENT_ANNOTATION:
    return null

  case Actions.SELECT_ANNOTATION:
    return action.id

  default:
    return state

  }
}

export default currentAnnotation
