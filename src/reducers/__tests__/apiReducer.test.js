import apiReducer from '../apiReducer'
import actionTypes from '../../constants/ApiActionTypes'
import initialState from '../constants'

test('it should return initial state', () => {
  expect(apiReducer(undefined, {})).toEqual(initialState)
})

test('it should handle FETCH_LEVELS_BEGIN', () => {
  expect(apiReducer(initialState, { type: actionTypes.FETCH_LEVELS_BEGIN })).toEqual({
    ...initialState,
    loading: true,
    error: null,
  })
})

test('it should handle FETCH_LEVELS_SUCESS', () => {
  const mockData = {
    levels: [
      {
        cards: ['a'],
        difficulty: 'easy',
      },
      {
        cards: ['b'],
        difficulty: 'hard',
      },
    ],
  }

  const mockCards = {
    easy: [
      {
        id: 0,
        symbol: 'a',
        flipped: false,
        matched: false,
        difficulty: 'easy',
      },
    ],
    hard: [
      {
        id: 0,
        symbol: 'b',
        flipped: false,
        matched: false,
        difficulty: 'hard',
      },
    ],
  }
  expect(
    apiReducer(initialState, { type: actionTypes.FETCH_LEVELS_SUCCESS, payload: mockData })
  ).toEqual({
    ...initialState,
    loading: false,
    levels: ['easy', 'hard'],
    currentLevel: 0,
    cards: mockCards,
  })
})

test('it should handle FETCH_LEVEL_FAILURE', () => {
  expect(
    apiReducer(initialState, {
      type: actionTypes.FETCH_LEVELS_FAILURE,
      payload: { error: 'ERROR' },
    })
  ).toEqual({
    ...initialState,
    loading: false,
    error: 'ERROR',
  })
})
