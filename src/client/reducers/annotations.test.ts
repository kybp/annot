import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions, { addAnnotation } from '../actions'
import { clearAnnotations, clearSnippets } from '../actions'
import reducer from './annotations'

describe('annotations reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })
  const annotation = {
    id:    '1',
    title: 'a title',
    body:  'a body',
    selections: {
      snippetId: [{ annotationId: 'a1', start: 0, end: 2 }]
    }
  }

  describe('initial state', () => {
    it('is an empty array', () => {
      assert.deepEqual(initialState, [])
    })
  })

  describe(Actions[Actions.ADD_ANNOTATION], () => {
    it('adds the annotation to its state', () => {
      const afterAdd = reducer(initialState, addAnnotation(annotation))
      assert.deepEqual(afterAdd, [annotation])
    })
  })

  describe(Actions[Actions.CLEAR_ANNOTATIONS], () => {
    it('resets its state object', () => {
      const initial = reducer(initialState, addAnnotation(annotation))
      const updated = reducer(initial, clearAnnotations())
      assert.deepEqual(updated, initialState)
    })
  })

  describe(Actions[Actions.CLEAR_SNIPPETS], () => {
    it('resets its state object', () => {
      const initial = reducer(initialState, addAnnotation(annotation))
      const updated = reducer(initial, clearSnippets())
      assert.deepEqual(updated, initialState)
    })
  })
})
