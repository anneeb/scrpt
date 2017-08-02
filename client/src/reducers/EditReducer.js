import {
  SET_EDITOR_STATE,
  RESET_SCRIPT
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_EDITOR_STATE:
      return {
        editorState: action.payload
      }
    case RESET_SCRIPT:
      return {}
    default:
      return state
  }
}
