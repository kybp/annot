import Actions from '../actions'
import { Snippet } from '../../models'

const snippets = (state: Snippet[] = [], action: any) => {
  switch (action.type) {

  case Actions.ADD_SNIPPET:
    return state.concat({ id: action.id, title: action.title, body: action.body })

  case Actions.CLEAR_SNIPPETS:
    return []

  default:
    return state

  }
}

export default snippets
