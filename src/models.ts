export type Annotation = {
  id:    string
  title: string
  body:  string
}

export type Snippet = {
  id:    string
  title: string
  body:  string
}

export type HighlightSelection = {
  start: number
  end:   number
  // The annotation ID will be null for selections associated with an
  // annotation that has not yet been added. For fetched uploads, this
  // should never be null.
  annotationId: string
}

export type SnippetSelections = {
  [key: string]: HighlightSelection[]
}
