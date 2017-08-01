import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ScriptReducer from './ScriptReducer'
import EditReducer from './EditReducer'
import VersionReducer from './VersionReducer'
import ReportReducer from './ReportReducer'

const Reducers = combineReducers({
  AuthReducer,
  ScriptReducer,
  EditReducer,
  VersionReducer,
  ReportReducer
})

export default Reducers
