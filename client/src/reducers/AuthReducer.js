import {
  AUTH_USER,
  AUTH_ERROR,
  CHECK_AUTH,
  AUTH_COMPLETED
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        shouldRedirect: true,
        [action.payload.script.cuid]: action.payload.editor
      }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case CHECK_AUTH:
      return { ...state, message: action.payload }
    case AUTH_COMPLETED:
      return {...state, shouldRedirect: false}
    default:
      return state
  }
}
