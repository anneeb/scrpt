import AuthAdapter from '../adapters/AuthAdapter'
import ScriptsAdapter from '../adapters/ScriptsAdapter'
import {
  AUTH_USER,
  AUTH_USER_WITH_REDIRECT,
  AUTH_ERROR,
  CHECK_AUTH,
  AUTH_COMPLETED,
  UNAUTH_USER,
  DID_GET_SCRIPT,
  SCRIPT_ERROR
} from './types'

export function logIn (params) {
  return function (dispatch) {
    AuthAdapter.logIn(params)
      .then(resp => {
        if (resp.data.error) {
          dispatch(authError(resp.data.error))
        } else {
          dispatch(didGetScript(resp.data))
          dispatch(authUserWithRedirect(resp.data))
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
        if (resp.data.error) {
          dispatch(authError(resp.data.error))
        } else {
          dispatch(didGetScript(resp.data))
          dispatch(authUserWithRedirect(resp.data))
        }
      })
      .catch(() => {
        dispatch(authError('Something went wrong. Please try again.'))
      })
  }
}

export function getScript (cuid) {
  return function (dispatch) {
    ScriptsAdapter.getScript(cuid)
      .then(resp => {
        if (resp.data.error) {
          dispatch(scriptError(resp.data.error))
        } else {
          dispatch(didGetScript(resp.data))
        }
      })
      .catch(() => {
        dispatch(scriptError('Something went wrong. Please try again.'))
      })
  }
}

export function checkScriptAuth (cuid) {
  const token = localStorage.getItem(cuid)
  if (token) {
    return checkAuth(token, cuid)
  } else {
    return getScript(cuid)
  }
}

export function checkAuth(token, cuid) {
  return function (dispatch) {
    AuthAdapter.checkAuth(token)
      .then(resp => {
        if (resp.data.error) {
          dispatch(unAuthUser(cuid))
          dispatch(getScript(cuid))
        } else {
          dispatch(didGetScript(resp.data))
          dispatch(authUser(resp.data))
        }
      })
  }
}

export function didGetScript(data) {
  return {
    type: DID_GET_SCRIPT,
    payload: data.payload
  }
}

export function authUser(data) {
  return {
    type: AUTH_USER,
    payload: data.payload
  }
}

export function authUserWithRedirect(data) {
  localStorage.setItem(data.payload.script.cuid, data.token)
  return {
    type: AUTH_USER_WITH_REDIRECT,
    payload: data.payload
  }
}

export function unAuthUser(cuid) {
  localStorage.removeItem(cuid)
  return {
    type: UNAUTH_USER,
    payload: cuid
  }
}

export function authCompleted () {
  return {
    type: AUTH_COMPLETED
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function scriptError (error) {
  return {
    type: SCRIPT_ERROR,
    payload: error
  }
}
