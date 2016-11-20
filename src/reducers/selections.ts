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

    let result: { start: number, end: number }[] = []
    for (let selection of selections) {
      let i = result.length - 1

      if (i >= 0 && result[i].end === selection.start) {
        result[i].end = selection.end
      } else {
        result.push(selection)
      }
    }

    return Object.assign({}, state, {
      [action.snippet.title]: result
    })
  case Actions.ADD_SNIPPET:
    return Object.assign({}, state, { [action.title]: [] })
  default:
    return state
  }
}

export default selections
