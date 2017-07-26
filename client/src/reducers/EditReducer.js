import {
  SET_CONTENT_STATE,
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CONTENT_STATE:
      return {...state, contentState: action.payload}
    default:
      return state
  }
}
