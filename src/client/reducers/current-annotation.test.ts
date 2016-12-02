import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions, { addSelection }  from '../actions'
import { clearCurrentAnnotation, selectAnnotation }  from '../actions'
import reducer from './current-annotation'

describe('current annotation reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })

  describe('initial state', () => {
    it('is null', () => {
      assert.isNull(initialState)
    })
  })

  describe(Actions[Actions.CLEAR_CURRENT_ANNOTATION], () => {
    it('resets the current annotation', () => {
      const initial = reducer(initialState, selectAnnotation('a1'))
      const updated = reducer(initial, clearCurrentAnnotation())
      assert.strictEqual(updated, initialState)
    })
  })

  describe(Actions[Actions.ADD_SELECTION], () => {
    it('resets the current annotation', () => {
      const initial = reducer(initialState, selectAnnotation('a1'))
      const updated = reducer(initial, addSelection({
        annotationId: 'a', snippetId: 's', start: 0, end: 1
      }))
      assert.strictEqual(updated, initialState)
    })
  })

  describe(Actions[Actions.SELECT_ANNOTATION], () => {
    it('sets the current annotation to the given ID', () => {
      const id    = 'a1'
      const state = reducer(initialState, selectAnnotation(id))
      assert.strictEqual(state, id)
    })
  })

})
