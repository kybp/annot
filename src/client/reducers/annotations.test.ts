import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions, { addAnnotation } from '../actions'
import reducer from './annotations'

describe('annotations reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })
  const annotation = {
    body:       'a body',
    selections: { id: [{ start: 0, end: 2 }] }}

  describe('initial state', () => {
    it('is an empty object', () => {
      assert.deepEqual(initialState, {})
    })
  })

  describe(Actions[Actions.ADD_ANNOTATION], () => {
    it('adds the annotation to its state object', () => {
      const afterAdd = reducer(initialState, addAnnotation('title', annotation))
      assert.deepEqual(afterAdd, { title: annotation })
    })
  })
})
