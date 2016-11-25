import { SnippetSelections } from './selections'

export type Annotation = {
  body:       string,
  selections: SnippetSelections
}

const annotations = (state: { [key: string]: Annotation} = {}, action: any) => {
  switch (action.type) {

  default:
    return state

  }
}

export default annotations
