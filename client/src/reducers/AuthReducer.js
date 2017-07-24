import {
  DID_LOG_IN
} from '../ActionTypes'

export default function (state = {authenticated: false}, action) {
  function didLogIn () {
    return {authenticated: true, ...action.data}
  }

  const Switch = {
    [DID_LOG_IN]: didLogIn
  }

  return (Switch[action.type] || function () {return state})()

}
