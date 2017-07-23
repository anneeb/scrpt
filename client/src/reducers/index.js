import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import EditReducer from './EditReducer'
import ScriptReducer from './ScriptReducer'

const Reducers = combineReducers({
  auth: AuthReducer,
  edit: EditReducer,
  script: ScriptReducer
})

export default Reducers
