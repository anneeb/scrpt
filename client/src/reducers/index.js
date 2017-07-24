import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import EditReducer from './EditReducer'
import ScriptsReducer from './ScriptsReducer'

const Reducers = combineReducers({
  auth: AuthReducer,
  edit: EditReducer,
  script: ScriptsReducer
})

export default Reducers
