import {
  DID_GET_SCRIPT,
  DID_GET_SCRIPT_WITH_AUTH,
  DID_GET_SCRIPT_WITH_AUTH_REDIRECT,
  DID_GET_SCRIPT_WITH_NO_AUTH,
  SET_VERSION
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case DID_GET_SCRIPT:
      return {
        ...state,
        active: 0,
        version: { ...action.payload.script.versions[0] }
      }
    case DID_GET_SCRIPT_WITH_AUTH:
      return {
        ...state,
        active: 0,
        version: { ...action.payload.script.versions[0] }
      }
    case DID_GET_SCRIPT_WITH_AUTH_REDIRECT:
      return {
        ...state,
        active: 0,
        version: { ...action.payload.script.versions[0] }
      }
    case DID_GET_SCRIPT_WITH_NO_AUTH:
      return {
        ...state,
        active: 0,
        version: { ...action.payload.script.versions[0] }
      }
    case SET_VERSION:
      return {
        ...state,
        active: action.payload.index,
        version: { ...action.payload.version }
      }
    default:
      return state
  }
}
