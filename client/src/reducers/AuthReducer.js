import {
  AUTH_USER,
  AUTH_ERROR,
  CHECK_AUTH
} from '../actions/types'

export default function (state = {}, action) {
// export default function (state = {authenticated: true}, action) {
  const cuid = action.payload ? action.payload.cuid : 'cuid'
  const Switch = {
    [AUTH_USER]: {
      ...state,
      error: '',
      [cuid]: true
    },
    [AUTH_ERROR]: { ...state, error: action.payload },
    [CHECK_AUTH]: { ...state, message: action.payload }
  }
  return Switch[action.type] || state
}
