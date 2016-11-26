export type Annotation = {
  id:         string
  title:      string
  body:       string
  selections: SnippetSelections
}

export type Snippet = {
  id:    string
  title: string
  body:  string
}

export type HighlightSelection = { start: number, end: number }

export type SnippetSelections = {
  [key: string]: HighlightSelection[]
}
