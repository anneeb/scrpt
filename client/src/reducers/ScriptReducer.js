import {
  DID_GET_SCRIPT,
  SCRIPT_ERROR
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case DID_GET_SCRIPT:
      return {...state, ...action.payload.script, error: '' }
    case SCRIPT_ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}
