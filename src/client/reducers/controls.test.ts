import * as mocha from 'mocha'
import { assert } from 'chai'
import { createElement } from 'react'
import Actions, { addControl, clearControls } from '../actions'
import reducer from './controls'

describe('controls reducer', () => {
  const initialState = reducer(undefined, 'INIT')

  describe('initial state', () => {
    it('is an empty array', () => {
      assert.deepEqual(initialState, [])
    })
  })

  describe(Actions[Actions.ADD_CONTROL], () => {
    it('adds the component to its state', () => {
      const action = addControl(createElement('div', 'control'))
      const state  = reducer(initialState, action)
      assert.strictEqual(state.length, initialState.length + 1)
    })
  })

  describe(Actions[Actions.CLEAR_CONTROLS], () => {
    it('resets its state object', () => {
      const action  = addControl(createElement('div', 'control'))
      const added   = reducer(initialState, action)
      const cleared = reducer(added, clearControls())
      assert.deepEqual(cleared, initialState)
    })
  })
})
