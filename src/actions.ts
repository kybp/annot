import { ISnippet } from './components/Snippet'

enum Actions {
  ADD_SNIPPET
}

export default Actions

export const addSnippet = ({ title, body }: ISnippet) => {
  return {
    type: Actions.ADD_SNIPPET,
    title, body
  }
}
