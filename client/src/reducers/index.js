import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ScriptReducer from './ScriptReducer'
import EditReducer from './EditReducer'
import VersionReducer from './VersionReducer'

const Reducers = combineReducers({
  AuthReducer,
  ScriptReducer,
  EditReducer,
  VersionReducer
})

export default Reducers
