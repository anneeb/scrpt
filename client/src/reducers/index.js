import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ScriptReducer from './ScriptReducer'
import EditReducer from './EditReducer'

const Reducers = combineReducers({
  auth: AuthReducer,
  script: ScriptReducer,
  edit: EditReducer
})

export default Reducers
