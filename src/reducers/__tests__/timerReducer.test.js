import timerReducer from '../timerReducer'
import actionTypes from '../../constants/TimerActionTypes'
import initialState from '../constants'

test('it should return initial state', () => {
  expect(timerReducer(undefined, {})).toEqual(initialState)
})

describe('TICK action', () => {
  test('it should not tick if no moves have been made', () => {
    expect(timerReducer(initialState, { type: actionTypes.TICK })).toEqual({
      ...initialState,
      time: 0,
    })
  })
  test('it should tick if moves have been made', () => {
    expect(timerReducer({ ...initialState, moves: 1 }, { type: actionTypes.TICK })).toEqual({
      ...initialState,
      time: 1,
      moves: 1,
    })
  })
})
