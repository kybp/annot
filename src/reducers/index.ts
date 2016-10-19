import { combineReducers } from 'redux'
import Actions from '../actions'
import { ISnippet } from '../components/Snippet'

import selections from './selections'
import snippets from './snippets'

export default combineReducers({ selections, snippets })
