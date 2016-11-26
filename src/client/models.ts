export type Annotation = {
  body:       string,
  selections: SnippetSelections
}

export type Snippet = {
  title: string
  body:  string
}

export type HighlightSelection = { start: number, end: number }

export type SnippetSelections = {
  [key: string]: HighlightSelection[]
}
