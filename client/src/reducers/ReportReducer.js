import {
  SET_FILTERS,
  ADD_REPORT_URL
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_FILTERS:
      return {
        id: action.payload.id,
        filters: { ...action.payload.filters }
      }
    case ADD_REPORT_URL:
      return {
        ...state,
        url: action.payload
      }
    default:
      return state
  }
}
