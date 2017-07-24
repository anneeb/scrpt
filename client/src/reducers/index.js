import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ScriptsReducer from './ScriptsReducer'

const Reducers = combineReducers({
  auth: AuthReducer,
  script: ScriptsReducer
})

export default Reducers
