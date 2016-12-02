import * as mocha from 'mocha'
import { assert } from 'chai'
import Actions from '../actions'
import { addAnnotation, addSelection, addSnippet } from '../actions'
import { clearSelections, clearSnippets } from '../actions'
import reducer from './selections'

describe('selections reducer', () => {
  const initialState = reducer(undefined, { type: 'INIT' })
  const snippet      = { id: 'x1', title: 'a title', body: 'a body' }
  const snippetId    = snippet.id
  const annotationId: string = null

  const addStartEnd = (start: number, end: number) => {
    return addSelection({ snippetId, annotationId, start, end })
  }

  describe('initial state', () => {
    it('is an empty object', () => {
      assert.deepEqual(initialState, {})
    })
  })

  describe(Actions[Actions.ADD_SNIPPET], () => {
    const state = reducer(initialState, addSnippet(snippet))

    it("adds the snippet's ID as a key in its state object", () => {
      assert.deepEqual(Object.keys(state), [snippet.id])
    })

    it("associates the snippet's title with an empty array", () => {
      assert.strictEqual(state[snippet.id].length, 0)
    })
  })

  describe(Actions[Actions.ADD_SELECTION], () => {
    const beforeAdd  = reducer(initialState, addSnippet(snippet))
    const bodyLength = snippet.body.length

    it("adds an object to the snippet's selection array", () => {
      const initialLength = beforeAdd[snippet.id].length
      const afterAdd      = reducer(beforeAdd, addStartEnd(0, bodyLength))
      const updatedLength = afterAdd[snippet.id].length
      const difference    = updatedLength - initialLength
      assert.strictEqual(difference, 1)
    })

    it('does not add collapsed selections', () => {
      const initialLength = beforeAdd[snippet.id].length
      const updatedState  = reducer(beforeAdd, addStartEnd(0, 0))
      const updatedLength = updatedState[snippet.id].length
      const difference    = updatedLength - initialLength
      assert.strictEqual(difference, 0)
    })

    it('keeps the list of selections sorted', () => {
      const selections = [
        { snippetId, annotationId, start: 5, end: 6 },
        { snippetId, annotationId, start: 1, end: 2 },
        { snippetId, annotationId, start: 3, end: 4 }
      ].map(addSelection).reduce(reducer, beforeAdd)[snippet.id]

      for (let i = 1; i < selections.length; ++i) {
        assert.ok(selections[i - 1].start <= selections[i].start)
      }
    })

    it('merges touching selections into one', () => {
      const [start, middle, end] = [0, 2, 4]
      const afterFirstAdd  = reducer(beforeAdd,     addStartEnd(start,  middle))
      const afterSecondAdd = reducer(afterFirstAdd, addStartEnd(middle, end))
      const selections     = afterSecondAdd[snippet.id]
      assert.deepEqual(selections, [{ annotationId, start, end }])
    })

    it('does not merge non-touching selections into one', () => {
      const firstEnd       = 1
      const afterFirstAdd  = reducer(beforeAdd, addStartEnd(0, firstEnd))
      const secondAction   = addStartEnd(firstEnd + 1, firstEnd + 2)
      const afterSecondAdd = reducer(afterFirstAdd, secondAction)
      assert.strictEqual(afterSecondAdd[snippet.id].length, 2)
    })

    it('merges a contained selection into its containing selection', () => {
      const [outerStart, outerEnd] = [0, 4]
      const [innerStart, innerEnd] = [1, 3]
      const firstAdded  = reducer(beforeAdd,  addStartEnd(outerStart, outerEnd))
      const secondAdded = reducer(firstAdded, addStartEnd(innerStart, innerEnd))
      assert.deepEqual(
        firstAdded[snippetId],
        [{ annotationId, start: outerStart, end: outerEnd }]
      )
    })

    it('merges overlapping selections', () => {
      const [firstStart, secondStart, firstEnd, secondEnd] = [0, 1, 2, 3]
      const firstAdded  = reducer(beforeAdd,  addStartEnd(firstStart,  firstEnd))
      const secondAdded = reducer(firstAdded, addStartEnd(secondStart, secondEnd))
      assert.deepEqual(
        secondAdded[snippetId],
        [{ annotationId, start: firstStart, end: secondEnd }])
    })

    it('does not merge selections belonging to different annotations', () => {
      const [start, middle, end] = [0, 2, 4]
      const selection1  = { snippetId, annotationId: 'a1', start, end: middle }
      const selection2  = { snippetId, annotationId: 'a2', start: middle, end }
      const firstAdded  = reducer(beforeAdd,  addSelection(selection1))
      const secondAdded = reducer(firstAdded, addSelection(selection2))
      assert.strictEqual(secondAdded[snippetId].length, 2)
    })
  })

  describe(Actions[Actions.CLEAR_SELECTIONS], () => {
    it('clears the selection list for each snippet', () => {
      const initial  = reducer(initialState, addSnippet(snippet))
      const selected = reducer(initial,      addStartEnd(0, snippet.body.length))
      const updated  = reducer(selected,     clearSelections())
      assert.deepEqual(updated, { [snippet.id]: [] })
    })
  })

  describe(Actions[Actions.CLEAR_SNIPPETS], () => {
    it('resets its state object', () => {
      const initial = reducer(initialState, addSnippet(snippet))
      const updated = reducer(initial, clearSnippets())
      assert.deepEqual(updated, initialState)
    })
  })

  describe(Actions[Actions.ADD_ANNOTATION], () => {
    it("replaces null annotation ID's with the new ID", () => {
      const initial = reducer(initialState, addSnippet(snippet))
      const added   = reducer(initial, addStartEnd(0, 1))
      const id      = 'a1'
      const action  = addAnnotation({ id, title: 'title', body: 'body' })
      const updated = reducer(added, action)
      assert.strictEqual(updated[snippet.id][0].annotationId, id)
    })

    it("does not replace non-null annotation ID's", () => {
      const initial = reducer(initialState, addSnippet(snippet))
      const id      = 'a1'
      const added   = reducer(initial, addSelection({
        snippetId, annotationId: id, start: 0, end: 1
      }))
      const action = addAnnotation({
        id: 'other' + id, title: 'title', body: 'body'
      })
      const updated = reducer(added, action)
      assert.strictEqual(updated[snippet.id][0].annotationId, id)
    })
  })
})
