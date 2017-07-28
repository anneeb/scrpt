import {
  DID_GET_SCRIPT_WITH_AUTH,
  DID_GET_SCRIPT_WITH_AUTH_REDIRECT,
  DID_GET_SCRIPT_WITH_NO_AUTH,
  AUTH_REDIRECT_COMPLETED,
  AUTH_ERROR
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case DID_GET_SCRIPT_WITH_AUTH:
      return {
        ...state,
        [action.payload.script.cuid]: action.payload.editor
      }
    case DID_GET_SCRIPT_WITH_AUTH_REDIRECT:
      return {
        ...state,
        [action.payload.script.cuid]: action.payload.editor,
        shouldRedirect: true
      }
    case DID_GET_SCRIPT_WITH_NO_AUTH:
      return {
        ...state,
        [action.payload.script.cuid]: null
      }
    case AUTH_REDIRECT_COMPLETED:
      return {
        ...state,
        shouldRedirect: false
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
