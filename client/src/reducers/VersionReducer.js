import {
  DID_GET_SCRIPT,
  DID_GET_SCRIPT_WITH_AUTH,
  DID_GET_SCRIPT_WITH_AUTH_REDIRECT,
  DID_GET_SCRIPT_WITH_NO_AUTH,
  SET_VERSION,
  ADD_PDF_URL,
  RESET_SCRIPT
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case DID_GET_SCRIPT:
      return {
        active: 0,
        version: { ...action.payload.script.versions[0] }
      }
    case DID_GET_SCRIPT_WITH_AUTH:
      return {
        active: 0,
        version: { ...action.payload.script.versions[0] }
      }
    case DID_GET_SCRIPT_WITH_AUTH_REDIRECT:
      return {
        active: 0,
        version: { ...action.payload.script.versions[0] }
      }
    case DID_GET_SCRIPT_WITH_NO_AUTH:
      return {
        active: 0,
        version: { ...action.payload.script.versions[0] }
      }
    case SET_VERSION:
      return {
        active: action.payload.index,
        version: { ...action.payload.version }
      }
    case ADD_PDF_URL:
      if (state.version.id === action.payload.id)
        return {
          ...state,
          version: {
            ...state.version,
            url: action.payload.url
          }
        }
      else
        return state
    case RESET_SCRIPT:
      return {}
    default:
      return state
  }
}
