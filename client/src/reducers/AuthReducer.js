import {
  AUTH_USER,
  AUTH_USER_WITH_REDIRECT,
  AUTH_ERROR,
  CHECK_AUTH,
  AUTH_COMPLETED,
  UNAUTH_USER
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER_WITH_REDIRECT:
      return {
        ...state,
        error: '',
        shouldRedirect: true,
        [action.payload.script.cuid]: action.payload.editor
      }
    case AUTH_USER:
      return {
        ...state,
        error: '',
        shouldRedirect: false,
        [action.payload.script.cuid]: action.payload.editor
      }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case CHECK_AUTH:
      return { ...state, message: action.payload }
    case AUTH_COMPLETED:
      return {...state, shouldRedirect: false}
    case UNAUTH_USER:
      return {...state, [action.payload]: null}

    default:
      return state
  }
}
