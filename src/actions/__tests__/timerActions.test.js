import actionTypes from '../../constants/TimerActionTypes'
import tick from '../timerActions'

test('creates TICK action', () => {
  const expectedAction = {
    type: actionTypes.TICK,
  }

  expect(tick()).toEqual(expectedAction)
})
