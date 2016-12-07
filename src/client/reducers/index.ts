import { combineReducers } from 'redux'

import annotations from './annotations'
import controls from './controls'
import currentAnnotation from './current-annotation'
import selections from './selections'
import snippets from './snippets'

export default combineReducers({
  annotations,
  controls,
  currentAnnotation,
  selections,
  snippets,
})
