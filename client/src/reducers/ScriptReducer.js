import {
  DID_GET_SCRIPT,
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case DID_GET_SCRIPT:
      return {...state, ...action.payload.script }
    default:
      return state
  }
}
