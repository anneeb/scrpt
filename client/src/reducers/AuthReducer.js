import {
  DID_LOG_IN
} from '../ActionTypes'

export default function (state = {}, action) {
  function didLogIn () {
    return {isLoggedIn: true, ...action.data}
  }

  const Switch = {
    [DID_LOG_IN]: didLogIn
  }

  return (Switch[action.type] || function () {return state})()

}
