import actionTypes from '../../constants/TimerActionTypes'
import * as actions from '../timerActions'

test('creates TICK action', () => {
  const expectedAction = {
    type: actionTypes.TICK,
  }

  expect(actions.tick()).toEqual(expectedAction)
})
