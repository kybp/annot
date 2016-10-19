import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions, { addSelection, addSnippet } from '../actions'
import reducer from './selections'

describe('selections reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })
  const snippet      = { title: 'a title', body: 'a body' }

  describe('initial state', () => {
    it('is an empty object', () => {
      assert.deepEqual(initialState, {})
    })
  })

  describe(Actions[Actions.ADD_SNIPPET], () => {
    const state = reducer(initialState, addSnippet(snippet))

    it("adds the snippet's title as a key in its state object", () => {
      assert.deepEqual(Object.keys(state), [snippet.title])
    })

    it("associates the snippet's title with an empty array", () => {
      assert.strictEqual(state[snippet.title].length, 0)
    })
  })

  describe(Actions[Actions.ADD_SELECTION], () => {
    const beforeAdd  = reducer(initialState, addSnippet(snippet))
    const bodyLength = snippet.body.length
    const action     = addSelection({ snippet, start: 0, end: bodyLength })
    const afterAdd   = reducer(beforeAdd, action)

    it("adds an object to the snippet's selection array", () => {
      const initialLength = beforeAdd[snippet.title].length
      const updatedLength = afterAdd[snippet.title].length
      const difference    = updatedLength - initialLength
      assert.strictEqual(difference, 1)
    })
  })
})
