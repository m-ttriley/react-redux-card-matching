import { createSelector } from 'reselect'
import _ from 'lodash'

export const levelsSelector = state => _.get(state, 'levels', '')
export const currentLevelSelector = state => _.get(state, 'currentLevel', 0)
export const movesSelector = state => _.get(state, 'moves', 0)
export const cardsSelector = state => _.get(state, 'cards', [])
export const finishedSelector = state => _.get(state, 'finished', false)
export const isLoadingSelector = state => _.get(state, 'loading', true)
export const matchedCardsSelector = state => _.get(state, 'matchedCards', [])
export const timeSelector = state => _.get(state, 'time', 0)
export const cardsFlippedSelector = state => _.get(state, 'cardsFlipped', 0)
export const maxCardsFlippedSelector = state => _.get(state, 'maxCardsFlipped', 2)

export const currentLevelNameSelector = createSelector(
  [levelsSelector, currentLevelSelector],
  (levels, currentLevel) => levels[currentLevel] || ''
)

export const levelCardsSelector = createSelector(
  [cardsSelector, currentLevelNameSelector],
  (cards, levelName) => cards[levelName]
)

export const nonMatchedCardsSelector = createSelector([levelCardsSelector], levelCards =>
  _.filter(levelCards, card => !card.matched)
)

export const matchedSymbolsSelector = createSelector([levelCardsSelector], levelCards =>
  _(levelCards)
    .filter(card => card.matched)
    .map(card => card.symbol)
    .uniq()
    .value()
)

export const canFlipCardsSelector = createSelector(
  [maxCardsFlippedSelector, cardsFlippedSelector],
  (maxCards, cardsFlipped) => cardsFlipped < maxCards
)

export const isTriplesSelector = createSelector(
  [maxCardsFlippedSelector],
  maxCardsFlipped => maxCardsFlipped === 3
)

export const gamePropsSelector = createSelector(
  [
    nonMatchedCardsSelector,
    matchedSymbolsSelector,
    currentLevelNameSelector,
    movesSelector,
    canFlipCardsSelector,
    finishedSelector,
    isLoadingSelector,
    timeSelector,
    isTriplesSelector,
  ],
  (cards, matchedCards, level, moves, canFlipCards, finished, loading, time, isTriples) => ({
    loading,
    finished,
    canFlipCards,
    isTriples,
    game: {
      cards,
      matchedCards,
      level,
      moves,
      time,
    },
  })
)
