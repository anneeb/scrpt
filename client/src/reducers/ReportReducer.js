import {
  SET_FILTERS
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_FILTERS:
      return {
        id: action.payload.id,
        filters: { ...action.payload.filters }
      }
    case 'TOGGLE_ACT':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      }
    default:
      return state
  }
}
