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

    it('does not add collapsed selections', () => {
      const initialLength = beforeAdd[snippet.title].length
      const action        = addSelection({ snippet, start: 0, end: 0 })
      const updatedState  = reducer(beforeAdd, action)
      const updatedLength = updatedState[snippet.title].length
      const difference    = updatedLength - initialLength
      assert.strictEqual(difference, 0)
    })

    it('keeps the list of selections sorted', () => {
      const selections = [
        { snippet, start: 5, end: 6 },
        { snippet, start: 1, end: 2 },
        { snippet, start: 3, end: 4 }
      ].map(addSelection).reduce(reducer, beforeAdd)[snippet.title]

      for (let i = 1; i < selections.length; ++i) {
        assert.ok(selections[i - 1].start <= selections[i].start)
      }
    })
  })
})
