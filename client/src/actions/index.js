import AuthAdapter from '../adapters/AuthAdapter'
import ScriptsAdapter from '../adapters/ScriptsAdapter'
import {
  AUTH_USER,
  AUTH_ERROR,
  CHECK_AUTH,
  AUTH_COMPLETED,
  DID_GET_SCRIPT
} from './types'

export function logIn (params) {
  return function (dispatch) {
    AuthAdapter.logIn(params)
      .then(resp => {
        if (resp.error) {
          dispatch(authError(resp.error))
        } else {
          localStorage.setItem(resp.data.payload.script.cuid, resp.data.token)
          dispatch({
            type: DID_GET_SCRIPT,
            payload: resp.data.payload
          })
          dispatch({
            type: AUTH_USER,
            payload: resp.data.payload
          })
        }
      })
      .catch(() => {
        dispatch(authError('Something went wrong. Please try again.'))
      })
  }
}

export function createScript (params) {
  return function (dispatch) {
    ScriptsAdapter.createScript(params)
      .then(resp => {
        localStorage.setItem(resp.data.payload.script.cuid, resp.data.token)
        dispatch({
          type: DID_GET_SCRIPT,
          payload: resp.data.payload
        })
        dispatch({
          type: AUTH_USER,
          payload: resp.data.payload
        })
      })
      .catch(() => {
        dispatch(authError('Something went wrong. Please try again.'))
      })
  }
}

export function authCompleted () {
  return {
    type: AUTH_COMPLETED
  }
}

//
// export function signupUser ({ email, password }) {
//   return function (dispatch) {
//     axios.post(`${ROOT_URL}/signup`, { email, password })
//       .then(response => {
//         dispatch({ type: AUTH_USER })
//         localStorage.setItem('token', response.data.token)
//       })
//       .catch(response => dispatch(authError(response.data.error)))
//   }
// }
//

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function checkAuth (params) {
  return function (dispatch) {
    AuthAdapter.checkAuth()
      .then(resp => {
        dispatch({
          type: CHECK_AUTH,
          payload: resp.data.message
        })
      })
  }
}
