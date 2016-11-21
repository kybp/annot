import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions from '../actions'
import reducer from './annotations'

describe('annotations reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })

  describe('initial state', () => {
    it('is an empty array', () => {
      assert.deepEqual(initialState, [])
    })
  })
})
