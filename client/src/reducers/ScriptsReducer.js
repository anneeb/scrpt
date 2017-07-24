import {
  DID_CREATE_SCRIPT,
} from '../actions/types'

export default function (state = {}, action) {
  const cuid = action.payload ? action.payload.cuid : 'cuid'
  const Switch = {
    [DID_CREATE_SCRIPT]: {...state, cuid: cuid }
  }
  return Switch[action.type] || state
}
