import {
  DID_LOG_IN,
  DID_GET_SCRIPT
} from '../ActionTypes'

export const logIn = (data) => {
  return {
    type: DID_LOG_IN,
    payload: data
  }
}

export const getScript = (data) => {
  return {
    type: DID_GET_SCRIPT,
    payload: data
  }
}
