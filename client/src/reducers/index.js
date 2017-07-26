import {
  DID_GET_SCRIPT,
  DID_GET_SCRIPT_WITH_AUTH,
  DID_GET_SCRIPT_WITH_AUTH_REDIRECT,
  DID_GET_SCRIPT_WITH_NO_AUTH,
  AUTH_REDIRECT_COMPLETED,
  SET_EDITOR_STATE,
  AUTH_ERROR,
  SCRIPT_ERROR
} from '../actions/types'


function Reducer (state = { script: {}, auth: {}, edit: {} }, action) {
  switch (action.type) {
    case DID_GET_SCRIPT:
      return {
        ...state,
        script: {
          ...action.payload.script
        }
      }
    case DID_GET_SCRIPT_WITH_AUTH:
      return {
        ...state,
        auth: {
          ...state.auth,
          [action.payload.script.cuid]: action.payload.editor
        },
        script: {
          ...action.payload.script
        }
      }
    case DID_GET_SCRIPT_WITH_AUTH_REDIRECT:
      return {
        ...state,
        auth: {
          ...state.auth,
          [action.payload.script.cuid]: action.payload.editor,
          shouldRedirect: true
        },
        script: {
          ...action.payload.script
        }
      }
    case DID_GET_SCRIPT_WITH_NO_AUTH:
      return {
        ...state,
        auth: {
          ...state.auth,
          [action.payload.script.cuid]: null
        },
        script: {
          ...action.payload.script
        }
      }
    case AUTH_REDIRECT_COMPLETED:
      return {
        ...state,
        auth: {
          ...state.auth,
          shouldRedirect: false
        }
      }
    case SET_EDITOR_STATE:
      return {
        ...state,
        edit: {
          ...state.edit,
          editorState: action.payload
        }
      }
    case AUTH_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: action.payload
        }
      }
    case SCRIPT_ERROR:
      return {
        ...state,
        script: {
          ...state.script,
          error: action.payload
        }
      }
    default:
      return state
  }
}

export default Reducer
