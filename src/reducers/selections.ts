import Actions from '../actions'
import { SelectionState } from '../components/SnippetDisplay'

const selections = (state: SelectionState = {}, action: any) => {
  switch (action.type) {
  case Actions.ADD_SELECTION:
    const selections = state[action.snippet.title]
    return Object.assign({}, state, {
      [action.snippet.title]: selections.concat({
        start: action.start,
        end:   action.end
      })
    })
  case Actions.ADD_SNIPPET:
    return Object.assign({}, state, { [action.title]: [] })
  default:
    return state
  }
}

export default selections
