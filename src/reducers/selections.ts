import Actions from '../actions'
import { SelectionState } from '../components/SnippetDisplay'

const selections = (state: SelectionState = {}, action: any) => {
  switch (action.type) {
  case Actions.ADD_SELECTION:
    if (action.start === action.end) return state

    const selections = state[action.snippet.title].concat({
      start: action.start,
      end:   action.end
    }).sort((a, b) => a.start - b.start)

    return Object.assign({}, state, {
      [action.snippet.title]: selections
    })
  case Actions.ADD_SNIPPET:
    return Object.assign({}, state, { [action.title]: [] })
  default:
    return state
  }
}

export default selections
