import {
  DID_GET_SCRIPT,
  DID_GET_SCRIPT_WITH_AUTH,
  DID_GET_SCRIPT_WITH_AUTH_REDIRECT,
  DID_GET_SCRIPT_WITH_NO_AUTH,
  SCRIPT_ERROR
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case DID_GET_SCRIPT:
      return {
        ...state,
        script: { ...action.payload.script }
      }
    case DID_GET_SCRIPT_WITH_AUTH:
      return {
        ...state,
        script: { ...action.payload.script }
      }
    case DID_GET_SCRIPT_WITH_AUTH_REDIRECT:
      return {
        ...state,
        script: { ...action.payload.script }
      }
    case DID_GET_SCRIPT_WITH_NO_AUTH:
      return {
        ...state,
        script: { ...action.payload.script }
      }
    case SCRIPT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
