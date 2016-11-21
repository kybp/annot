import { Annotation } from './reducers/annotations'
import { Snippet } from './reducers/snippets'
import { SnippetSelections } from './reducers/selections'

enum Actions {
  ADD_ANNOTATION,
  ADD_SELECTION,
  ADD_SNIPPET,
}

export default Actions

export const addAnnotation = ({ body, selections }: Annotation) => {
  return {
    type: Actions.ADD_ANNOTATION,
    body, selections
  }
}

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
