import AuthAdapter from '../adapters/AuthAdapter'
import ScriptsAdapter from '../adapters/ScriptsAdapter'
import VersionsAdapter from '../adapters/VersionsAdapter'
import {
  DID_GET_SCRIPT,
  DID_GET_SCRIPT_WITH_AUTH,
  DID_GET_SCRIPT_WITH_AUTH_REDIRECT,
  DID_GET_SCRIPT_WITH_NO_AUTH,
  NO_AUTH,
  AUTH_REDIRECT_COMPLETED,
  SET_EDITOR_STATE,
  SET_VERSION,
  ADD_PDF_URL,
  SET_FILTERS,
  ADD_REPORT_URL,
  AUTH_ERROR,
  SCRIPT_ERROR,
  RESET_SCRIPT
} from './types'

export function logIn (formData) {
  return function (dispatch) {
    AuthAdapter.logIn(formData)
      .then(resp => {
        if (resp.data.error)
          dispatch(authError(resp.data.error))
        else {
          localStorage.setItem(resp.data.payload.script.cuid, resp.data.token)
          dispatch(didGetScriptWithAuthRedirect(resp.data))
        }
      })
      .catch(() => {
        dispatch(authError('Something went wrong. Please try again.'))
      })
  }
}

export function createScript (formData) {
  return function (dispatch) {
    ScriptsAdapter.createScript(formData)
      .then(resp => {
        if (resp.data.error)
          dispatch(authError(resp.data.error))
        else {
          localStorage.setItem(resp.data.payload.script.cuid, resp.data.token)
          dispatch(didGetScriptWithAuthRedirect(resp.data))
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
        if (resp.data.error)
          dispatch(scriptError(resp.data.error))
        else
          dispatch(didGetScript(resp.data))
      })
      .catch(() => {
        dispatch(scriptError('Something went wrong. Please try again.'))
      })
  }
}

export function getScriptWithNoAuth (cuid) {
  return function (dispatch) {
    ScriptsAdapter.getScript(cuid)
      .then(resp => {
        if (resp.data.error)
          dispatch(scriptError(resp.data.error))
        else
          dispatch(didGetScriptWithNoAuth(resp.data))
      })
      .catch(() => {
        dispatch(scriptError('Something went wrong. Please try again.'))
      })
  }
}

export function checkScriptAuth (cuid) {
  const token = localStorage.getItem(cuid)
  if (token)
    return checkAuth(token, cuid)
  else
    return getScript(cuid)
}

export function checkScriptAuthWithRedirect (cuid) {
  const token = localStorage.getItem(cuid)
  if (token)
    return checkAuthWithRedirect(token, cuid)
  else
    return getScript(cuid)
}

export function checkAuthWithRedirect (token, cuid) {
  return function (dispatch) {
    AuthAdapter.checkAuth(token)
      .then(resp => {
        if (resp.data.error) {
          localStorage.removeItem(cuid)
          dispatch(getScriptWithNoAuth(cuid))
        }
        else
          dispatch(didGetScriptWithAuthRedirect(resp.data))
      })
  }
}

export function checkAuth (token, cuid) {
  return function (dispatch) {
    AuthAdapter.checkAuth(token)
      .then(resp => {
        if (resp.data.error) {
          localStorage.removeItem(cuid)
          dispatch(getScriptWithNoAuth(cuid))
        }
        else
          dispatch(didGetScriptWithAuth(resp.data))
      })
  }
}

export function createVersion (json, cuid) {
  return function (dispatch) {
    const token = localStorage.getItem(cuid)
    VersionsAdapter.createVersion(json, token)
      .then(resp => {
        if (resp.data.error)
          dispatch(scriptError(resp.data.error))
        else
          dispatch(didGetScript(resp.data))
      })
      .catch(() => {
        dispatch(scriptError('Something went wrong. Please try again.'))
      })
  }
}

export function logOut (cuid) {
  localStorage.removeItem(cuid)
  return noAuth(cuid)
}

// dispatch actions

export function didGetScript (data) {
  return {
    type: DID_GET_SCRIPT,
    payload: data.payload
  }
}

export function didGetScriptWithAuth (data) {
  return {
    type: DID_GET_SCRIPT_WITH_AUTH,
    payload: data.payload
  }
}

export function didGetScriptWithAuthRedirect (data) {
  return {
    type: DID_GET_SCRIPT_WITH_AUTH_REDIRECT,
    payload: data.payload
  }
}

export function didGetScriptWithNoAuth (data) {
  return {
    type: DID_GET_SCRIPT_WITH_NO_AUTH,
    payload: data.payload
  }
}

export function resetScript () {
  return {
    type: RESET_SCRIPT
  }
}

export function noAuth (cuid) {
  return {
    type: NO_AUTH,
    payload: cuid
  }
}

export function authRedirectCompleted () {
  return {
    type: AUTH_REDIRECT_COMPLETED
  }
}

export function setEditorState (editorState) {
  return {
    type: SET_EDITOR_STATE,
    payload: editorState
  }
}

export function setVersion (payload) {
  return {
    type: SET_VERSION,
    payload: payload
  }
}

export function addPdfUrl (payload) {
  return {
    type: ADD_PDF_URL,
    payload: payload
  }
}

export function setFilters (payload) {
  return {
    type: SET_FILTERS,
    payload: payload
  }
}

export function addReportUrl (url) {
  return {
    type: ADD_REPORT_URL,
    payload: url
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
