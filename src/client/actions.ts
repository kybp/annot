import * as _ from 'lodash'
import { Annotation, Snippet, SnippetSelections } from '../models'

enum Actions {
  ADD_ANNOTATION,
  ADD_CONTROL,
  ADD_SELECTION,
  ADD_SNIPPET,
  CLEAR_ANNOTATIONS,
  CLEAR_CONTROLS,
  CLEAR_CURRENT_ANNOTATION,
  CLEAR_SELECTIONS,
  CLEAR_SNIPPETS,
  DO_UPLOAD,
  REMOVE_ANNOTATION,
  REMOVE_SNIPPET,
  SELECT_ANNOTATION,
}

export default Actions

export const addAnnotation = (
  { id, title, body }:
  { id?: string, title: string, body: string }
) => {
  return {
    type: Actions.ADD_ANNOTATION,
    title, body,
    id: id || _.uniqueId('annotation-')
  }
}

export const addControl = (control: JSX.Element) => {
  return {
    type: Actions.ADD_CONTROL,
    control
  }
}

export const addSelection = (
  { annotationId, snippetId, start, end }:
  { annotationId: string, snippetId: string, start: number, end: number }
) => {
  return {
    type: Actions.ADD_SELECTION,
    annotationId, snippetId, start, end
  }
}

export const addSnippet = (
  { id, title, body }:
  { id?: string, title: string, body: string }
) => {
  return {
    type: Actions.ADD_SNIPPET,
    title, body,
    id: id || _.uniqueId('snippet-')
  }
}

export const clearAnnotations = () => {
  return {
    type: Actions.CLEAR_ANNOTATIONS
  }
}

export const clearControls = () => {
  return {
    type: Actions.CLEAR_CONTROLS
  }
}

export const clearCurrentAnnotation = () => {
  return {
    type: Actions.CLEAR_CURRENT_ANNOTATION
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

export const removeAnnotation = (annotationId: string) => {
  return {
    type: Actions.REMOVE_ANNOTATION,
    annotationId
  }
}

export const removeSnippet = (snippetId: string) => {
  return {
    type: Actions.REMOVE_SNIPPET,
    snippetId
  }
}

export const selectAnnotation = (id: string) => {
  return {
    type: Actions.SELECT_ANNOTATION,
    id
  }
}
