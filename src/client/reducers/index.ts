import { combineReducers } from 'redux'

import annotations from './annotations'
import currentAnnotation from './current-annotation'
import selections from './selections'
import snippets from './snippets'

export default combineReducers({
  annotations,
  currentAnnotation,
  selections,
  snippets,
})
