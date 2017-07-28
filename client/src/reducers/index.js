import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ScriptReducer from './ScriptReducer'
import EditReducer from './EditReducer'

const Reducers = combineReducers({
  AuthReducer,
  ScriptReducer,
  EditReducer
})

export default Reducers
