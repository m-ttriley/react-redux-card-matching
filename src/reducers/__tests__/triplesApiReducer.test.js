import apiReducer from '../triplesApiReducer'
import actionTypes from '../../constants/TriplesApiActionTypes'
import { initialState } from '../constants'

test('it should return initial state', () => {
  expect(apiReducer(undefined, {})).toEqual(initialState)
})

test('it should handle FETCH_TRIPLES_BEGIN', () => {
  expect(apiReducer(initialState, { type: actionTypes.FETCH_TRIPLES_BEGIN })).toEqual({
    ...initialState,
    loading: true,
    error: null,
  })
})

test('it should handle FETCH_TRIPLES_SUCESS', () => {
  const mockData = { difficulty: 'triples', cards: ['a'] }

  const mockCards = {
    triples: [
      {
        id: 0,
        symbol: 'a',
        flipped: false,
        matched: false,
        difficulty: 'triples',
      },
    ],
  }
  expect(
    apiReducer(initialState, { type: actionTypes.FETCH_TRIPLES_SUCCESS, payload: mockData })
  ).toEqual({
    ...initialState,
    maxCardsFlipped: 3,
    loading: false,
    levels: ['triples'],
    currentLevel: 0,
    cards: mockCards,
  })
})

test('it should handle FETCH_LEVEL_FAILURE', () => {
  expect(
    apiReducer(initialState, {
      type: actionTypes.FETCH_TRIPLES_FAILURE,
      payload: { error: 'ERROR' },
    })
  ).toEqual({
    ...initialState,
    loading: false,
    error: 'ERROR',
  })
})
