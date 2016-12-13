import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions, { addAnnotation, removeAnnotation } from '../actions'
import { clearAnnotations, clearSnippets } from '../actions'
import reducer from './annotations'

describe('annotations reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })
  const annotation = {
    id:    '1',
    title: 'a title',
    body:  'a body'
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

  describe(Actions[Actions.REMOVE_ANNOTATION], () => {
    it('removes the indicated annotation from its state', () => {
      const afterAdd    = reducer(initialState, addAnnotation(annotation))
      const afterRemove = reducer(afterAdd,     removeAnnotation(annotation.id))
      assert.deepEqual(afterRemove, initialState)
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
