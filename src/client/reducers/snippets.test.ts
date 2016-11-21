import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions, { addSnippet } from '../actions'
import reducer from './snippets'

describe('snippets reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })
  const snippet      = { title: 'a title', body: 'a body' }

  describe('initial state', () => {
    it('is an empty array', () => {
      assert.deepEqual(initialState, [])
    })
  })

  describe(Actions[Actions.ADD_SNIPPET], () => {
    const beforeAdd = initialState
    const afterAdd  = reducer(beforeAdd, addSnippet(snippet))

    it('adds the snippet to its state', () => {
      const difference = afterAdd.length - beforeAdd.length
      assert.strictEqual(difference, 1)
    })
  })
})
