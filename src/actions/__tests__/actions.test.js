import actionTypes from '../../constants/GameActionTypes'
import * as actions from '../actions'

test('creates FLIP_CARD_UP action with card id', () => {
  const mockCardId = 1
  const expectedAction = {
    type: actionTypes.FLIP_CARD_UP,
    id: mockCardId,
  }

  expect(actions.flipCardUp(mockCardId)).toEqual(expectedAction)
})

test('creates FLIP_CARD_DOWN action with card id', () => {
  const mockCardId = 1
  const expectedAction = {
    type: actionTypes.FLIP_CARD_DOWN,
    id: mockCardId,
  }

  expect(actions.flipCardDown(mockCardId)).toEqual(expectedAction)
})

test('creates CHECK_GAME_STATE action', () => {
  const expectedAction = {
    type: actionTypes.CHECK_GAME_STATE,
  }

  expect(actions.checkGameState()).toEqual(expectedAction)
})

test('creates RESET_BOARD action', () => {
  const expectedAction = {
    type: actionTypes.RESET_BOARD,
  }

  expect(actions.resetBoard()).toEqual(expectedAction)
})
