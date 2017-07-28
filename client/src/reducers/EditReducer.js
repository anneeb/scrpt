import {
  SET_EDITOR_STATE,
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_EDITOR_STATE:
      return {
        ...state,
        editorState: action.payload
      }
    default:
      return state
  }
}
