import {
  DID_GET_SCRIPT
} from '../ActionTypes'

export default function (state = {}, action) {
  function didGetScript () {
    return {script: {...action.data}}
  }

  const Switch = {
    [DID_GET_SCRIPT]: didGetScript
  }

  return (Switch[action.type] || function () {return state})()

}
