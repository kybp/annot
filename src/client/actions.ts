import * as _ from 'lodash'
import { Annotation, Snippet, SnippetSelections } from './models'

enum Actions {
  ADD_ANNOTATION,
  ADD_SELECTION,
  ADD_SNIPPET,
  CLEAR_ANNOTATIONS,
  CLEAR_SELECTIONS,
  CLEAR_SNIPPETS,
  DO_UPLOAD,
}

export default Actions

export const addAnnotation = (
  { id = null, title, body, selections }:
  { id?: string, title: string, body: string, selections: SnippetSelections }
) => {
  return {
    type: Actions.ADD_ANNOTATION,
    title, body, selections,
    id: id || _.uniqueId('annotation-')
  }
}

export const addSelection = (
  { snippetId, start, end }: { snippetId: string, start: number, end: number }
) => {
  return {
    type: Actions.ADD_SELECTION,
    snippetId, start, end
  }
}

export const addSnippet = ({ title, body }: Snippet) => {
  return {
    type: Actions.ADD_SNIPPET,
    title, body
  }
}

export const clearAnnotations = () => {
  return {
    type: Actions.CLEAR_ANNOTATIONS
  }
}

export const clearSelections = () => {
  return {
    type: Actions.CLEAR_SELECTIONS
  }
}

export const clearSnippets = () => {
  return {
    type: Actions.CLEAR_SNIPPETS
  }
}

export const doUpload = () => {
  return {
    type: Actions.DO_UPLOAD
  }
}
