import actionTypes from '../constants/GameActionTypes'

export const flipCardUp = id => ({
  type: actionTypes.FLIP_CARD_UP,
  id,
})

export const flipCardDown = id => ({
  type: actionTypes.FLIP_CARD_DOWN,
  id,
})

export const checkGameState = () => ({
  type: actionTypes.CHECK_GAME_STATE,
})

export const resetBoard = () => ({
  type: actionTypes.RESET_BOARD,
})

export const restartGame = () => ({
  type: actionTypes.RESTART_GAME,
})
