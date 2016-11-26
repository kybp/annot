import Actions from '../actions'
import { SnippetSelections } from './selections'

export type Annotation = {
  body:       string,
  selections: SnippetSelections
}

const annotations = (state: { [key: string]: Annotation} = {}, action: any) => {
  switch (action.type) {

  case Actions.ADD_ANNOTATION:
    return Object.assign({}, state, {
      [action.title]: action.annotation
    })

  case Actions.CLEAR_ANNOTATIONS:
  case Actions.CLEAR_SNIPPETS:
    return {}

  default:
    return state

  }
}

export default annotations
