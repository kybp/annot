import { Snippet } from './reducers/snippets'

enum Actions {
  ADD_ANNOTATION,
  ADD_SELECTION,
  ADD_SNIPPET,
}

export default Actions

export const addSelection = (
  { snippet, start, end }: { snippet: Snippet, start: number, end: number }
) => {
  return {
    type: Actions.ADD_SELECTION,
    snippet, start, end
  }
}

export const addSnippet = ({ title, body }: Snippet) => {
  return {
    type: Actions.ADD_SNIPPET,
    title, body
  }
}
