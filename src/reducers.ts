import { combineReducers } from 'redux'
import Actions from './actions'
import { ISnippet } from './components/Snippet'

const snippets = (state: ISnippet[] = [], action: any) => {
  switch (action.type) {
  case Actions.ADD_SNIPPET:
    return state.concat({ title: action.title, body: action.body })
  default:
    return state
  }
}

export default combineReducers({ snippets })