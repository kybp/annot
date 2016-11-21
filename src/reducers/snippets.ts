import Actions from '../actions'

export type Snippet = {
  title: string,
  body:  string
}

const snippets = (state: Snippet[] = [], action: any) => {
  switch (action.type) {
  case Actions.ADD_SNIPPET:
    return state.concat({ title: action.title, body: action.body })
  default:
    return state
  }
}

export default snippets
