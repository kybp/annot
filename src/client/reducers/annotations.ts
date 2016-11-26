import Actions from '../actions'
import { Annotation, SnippetSelections } from '../models'

const annotations = (state: Annotation[] = [], action: any): Annotation[] => {
  switch (action.type) {

  case Actions.ADD_ANNOTATION:
    return state.concat({
      id:         action.id,
      title:      action.title,
      body:       action.body,
      selections: action.selections
    })

  case Actions.CLEAR_ANNOTATIONS:
  case Actions.CLEAR_SNIPPETS:
    return []

  default:
    return state

  }
}

export default annotations
