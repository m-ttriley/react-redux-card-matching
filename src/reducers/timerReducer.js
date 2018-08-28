import actionTypes from '../constants/TimerActionTypes'
import initialState from './constants'

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TICK: {
      if (state.moves > 0) {
        return {
          ...state,
          time: state.time + 1,
        }
      }
      return state
    }
    default:
      return state
  }
}
