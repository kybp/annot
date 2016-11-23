import Actions from '../actions'

export type HighlightSelection = { start: number, end: number }

export type SnippetSelections = {
  [key: string]: HighlightSelection[]
}

const selections =
  (state: SnippetSelections = {}, action: any):
SnippetSelections => {
  switch (action.type) {

  case Actions.ADD_ANNOTATION: {
    const result: SnippetSelections = {}

    Object.keys(state).forEach((key) => {
      result[key] = []
    })

    return result
  }

  case Actions.ADD_SELECTION: {
    if (action.start === action.end) return state

    const selections = state[action.snippetId].concat({
      start: action.start,
      end:   action.end
    }).sort((a, b) => a.start - b.start)

    let result: { start: number, end: number }[] = []
    for (let selection of selections) {
      let i = result.length - 1

      if (i >= 0 && result[i].end >= selection.start) {
        // Combine this selection with the previous one
        result[i].end = Math.max(result[i].end, selection.end)
      } else {
        result.push(selection)
      }
    }

    return Object.assign({}, state, {
      [action.snippetId]: result
    })
  }

  case Actions.ADD_SNIPPET:
    return Object.assign({}, state, { [action.title]: [] })

  default:
    return state

  }
}

export default selections
