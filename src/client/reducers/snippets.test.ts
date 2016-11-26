import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions, { addSnippet, clearSnippets } from '../actions'
import reducer from './snippets'

describe('snippets reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })
  const snippet      = { id: 'x1', title: 'a title', body: 'a body' }

  describe('initial state', () => {
    it('is an empty array', () => {
      assert.deepEqual(initialState, [])
    })
  })

  describe(Actions[Actions.ADD_SNIPPET], () => {
    it('adds the snippet to its state', () => {
      const afterAdd   = reducer(initialState, addSnippet(snippet))
      const difference = afterAdd.length - initialState.length
      assert.strictEqual(difference, 1)
    })
  })

  describe(Actions[Actions.CLEAR_SNIPPETS], () => {
    it('empties its state array', () => {
      const initial = reducer(initialState, addSnippet(snippet))
      const updated = reducer(initial, clearSnippets())
      assert.deepEqual(updated, [])
    })
  })
})
