import _ from 'lodash'
import actionTypes from '../constants/ApiActionTypes'
import { initialState } from './constants'

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_LEVELS_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case actionTypes.FETCH_LEVELS_SUCCESS: {
      const levels = action.payload.levels
      const augmentedCards = _.map(levels, level => ({
        [level.difficulty]: _.map(level.cards, (symbol, index) => ({
          symbol,
          id: index,
          flipped: false,
          matched: false,
          difficulty: level.difficulty,
        })),
      }))
      return {
        ...state,
        cardsFlipped: 0,
        maxCardsFlipped: 2,
        matchedCards: [],
        moves: 0,
        time: 0,
        finished: false,
        loading: false,
        levels: _.map(levels, level => level.difficulty),
        currentLevel: 0,
        cards: Object.assign(...augmentedCards),
      }
    }

    case actionTypes.FETCH_LEVELS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    }
    default:
      return state
  }
}
