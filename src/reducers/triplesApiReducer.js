import _ from 'lodash'
import actionTypes from '../constants/TriplesApiActionTypes'
import { initialState } from './constants'

export default function triplesApiReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_TRIPLES_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case actionTypes.FETCH_TRIPLES_SUCCESS: {
      const augmentedCards = {
        [action.payload.difficulty]: _.shuffle(
          _.map(action.payload.cards, (symbol, index) => ({
            symbol,
            id: index,
            flipped: false,
            matched: false,
            difficulty: action.payload.difficulty,
          }))
        ),
      }
      return {
        ...state,
        cardsFlipped: 0,
        maxCardsFlipped: 3,
        matchedCards: [],
        moves: 0,
        time: 0,
        finished: false,
        loading: false,
        levels: [action.payload.difficulty],
        currentLevel: 0,
        cards: augmentedCards,
      }
    }

    case actionTypes.FETCH_TRIPLES_FAILURE: {
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
