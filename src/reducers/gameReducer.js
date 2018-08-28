import _ from 'lodash'
import actionTypes from '../constants/GameActionTypes'
import { currentLevelNameSelector, levelCardsSelector } from '../selectors/gameSelectors'
import initialState from './constants'

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FLIP_CARD_UP: {
      return {
        ...state,
        moves: state.moves + 1,
        cards: {
          ...state.cards,
          [currentLevelNameSelector(state)]: _.map(
            levelCardsSelector(state),
            card => (card.id === action.id ? { ...card, flipped: true } : card)
          ),
        },
        cardsFlipped: state.cardsFlipped + 1,
      }
    }

    case actionTypes.FLIP_CARD_DOWN: {
      return {
        ...state,
        moves: state.moves + 1,
        cards: {
          ...state.cards,
          [currentLevelNameSelector(state)]: _.map(
            levelCardsSelector(state),
            card => (card.id === action.id ? { ...card, flipped: false } : card)
          ),
        },
        cardsFlipped: state.cardsFlipped - 1,
      }
    }

    case actionTypes.CHECK_GAME_STATE: {
      const currentLevel = currentLevelNameSelector(state)
      const levelCards = levelCardsSelector(state)
      const flippedCards = _.filter(levelCards, card => card.flipped && !card.matched)
      if (state.currentLevel === state.levels.length) {
        return {
          ...state,
          finished: true,
        }
      } else if (state.matchedCards.length === levelCards.length) {
        return {
          ...state,
          cardsFlipped: 0,
          matchedCards: [],
          currentLevel: state.currentLevel + 1,
        }
      } else if (flippedCards.length === state.maxCardsFlipped) {
        const cardCount = _.countBy(flippedCards, 'symbol')
        const duplicateCards = _.keys(_.pickBy(cardCount, value => value === state.maxCardsFlipped))
        if (duplicateCards.length > 0) {
          const matchedCards = _.map(
            _.filter(flippedCards, card => _.includes(duplicateCards, card.symbol)),
            'id'
          )
          return {
            ...state,
            cards: {
              ...state.cards,
              [currentLevel]: _.map(
                levelCards,
                card =>
                  _.includes(matchedCards, card.id)
                    ? { ...card, matched: true, flipped: false }
                    : card
              ),
            },
            cardsFlipped: 0,
            matchedCards: [...state.matchedCards, ...matchedCards],
          }
        }

        // turn cards back around
        return {
          ...state,
          cards: {
            ...state.cards,
            [currentLevel]: _.map(levelCards, card => ({ ...card, flipped: false })),
          },
          cardsFlipped: 0,
        }
      }

      return state
    }

    case actionTypes.RESET_BOARD: {
      const currentLevel = currentLevelNameSelector(state)
      const levelCards = levelCardsSelector(state)
      return {
        ...state,
        cardsFlipped: 0,
        matchedCards: [],
        cards: {
          ...state.cards,
          [currentLevel]: _.map(levelCards, card => ({ ...card, matched: false, flipped: false })),
        },
      }
    }

    default:
      return state
  }
}
