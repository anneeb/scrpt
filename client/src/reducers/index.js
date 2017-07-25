import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ScriptReducer from './ScriptReducer'

const Reducers = combineReducers({
  auth: AuthReducer,
  script: ScriptReducer
})

export default Reducers
