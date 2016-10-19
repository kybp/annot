import { ISnippet } from './components/Snippet'

enum Actions {
  ADD_SELECTION,
  ADD_SNIPPET,
}

export default Actions

export const addSelection = (
  { snippet, start, end }: { snippet: ISnippet, start: number, end: number }
) => {
  return {
    type: Actions.ADD_SELECTION,
    snippet, start, end
  }
}

export const addSnippet = ({ title, body }: ISnippet) => {
  return {
    type: Actions.ADD_SNIPPET,
    title, body
  }
}
