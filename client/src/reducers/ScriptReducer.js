import {
  DID_GET_SCRIPT,
  DID_GET_SCRIPT_WITH_AUTH,
  DID_GET_SCRIPT_WITH_AUTH_REDIRECT,
  DID_GET_SCRIPT_WITH_NO_AUTH,
  ADD_PDF_URL,
  SCRIPT_ERROR,
  RESET_SCRIPT
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case DID_GET_SCRIPT:
      return {
        script: { ...action.payload.script }
      }
    case DID_GET_SCRIPT_WITH_AUTH:
      return {
        script: { ...action.payload.script }
      }
    case DID_GET_SCRIPT_WITH_AUTH_REDIRECT:
      return {
        script: { ...action.payload.script }
      }
    case DID_GET_SCRIPT_WITH_NO_AUTH:
      return {
        script: { ...action.payload.script }
      }
    case ADD_PDF_URL:
      return {
        ...state,
        script: {
          ...state.script,
          versions: state.script.versions.map(v => {
            return v.id === action.payload.id ? { ...v, url: action.payload.url } : v
          })
        }
      }
    case SCRIPT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case RESET_SCRIPT:
      return {}
    default:
      return state
  }
}
