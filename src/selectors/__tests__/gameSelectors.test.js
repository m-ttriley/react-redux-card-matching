import * as selectors from '../gameSelectors'

const mockGameState = {
  levels: ['one'],
  currentLevel: 0,
  moves: 1,
  cards: {
    one: [
      {
        id: 1,
        flipped: false,
        matched: false,
        symbol: 'a',
      },
      {
        id: 2,
        flipped: false,
        matched: false,
        symbol: 'a',
      },
      {
        id: 3,
        flipped: false,
        matched: true,
        symbol: 'b',
      },
      {
        id: 4,
        flipped: false,
        matched: true,
        symbol: 'b',
      },
    ],
  },
  maxFlippedCards: 2,
  flippedCards: 0,
  finished: false,
  loading: false,
  matchedCards: [3, 4],
  time: 10,
}

test('levelsSelector', () => {
  expect(selectors.levelsSelector(mockGameState)).toEqual(mockGameState.levels)
})
test('currentLevelSelector', () => {
  expect(selectors.currentLevelSelector(mockGameState)).toEqual(mockGameState.currentLevel)
})
test('movesSelector', () => {
  expect(selectors.movesSelector(mockGameState)).toEqual(mockGameState.moves)
})
test('cardsSelector', () => {
  expect(selectors.cardsSelector(mockGameState)).toEqual(mockGameState.cards)
})
test('finishedSelector', () => {
  expect(selectors.finishedSelector(mockGameState)).toEqual(mockGameState.finished)
})
test('isLoadingSelector', () => {
  expect(selectors.isLoadingSelector(mockGameState)).toEqual(mockGameState.loading)
})
test('matchedCardsSelector', () => {
  expect(selectors.matchedCardsSelector(mockGameState)).toEqual(mockGameState.matchedCards)
})
test('time', () => {
  expect(selectors.timeSelector(mockGameState)).toEqual(mockGameState.time)
})

test('currentLevelNameSelector', () => {
  expect(selectors.currentLevelNameSelector(mockGameState)).toEqual('one')
})

test('levelCardsSelector', () => {
  expect(selectors.levelCardsSelector(mockGameState)).toEqual(mockGameState.cards.one)
})

test('nonMatchedCardsSelector', () => {
  expect(selectors.nonMatchedCardsSelector(mockGameState)).toEqual([
    {
      id: 1,
      flipped: false,
      matched: false,
      symbol: 'a',
    },
    {
      id: 2,
      flipped: false,
      matched: false,
      symbol: 'a',
    },
  ])
})

test('matchedSymbolsSelector', () => {
  expect(selectors.matchedSymbolsSelector(mockGameState)).toEqual(['b'])
})

describe('canFlipCardsSelector', () => {
  test('allows user to flip cards if the max has not been met', () => {
    expect(selectors.canFlipCardsSelector(mockGameState)).toEqual(true)
  })
  test('does not allow user to flip cards if the max has been met', () => {
    expect(selectors.canFlipCardsSelector({ ...mockGameState, cardsFlipped: 2 })).toEqual(false)
  })
})

describe('isTriplesSelector', () => {
  test('returns false if on pairs mode', () => {
    expect(selectors.isTriplesSelector(mockGameState)).toEqual(false)
  })
  test('returns true if on triples mode', () => {
    expect(selectors.isTriplesSelector({ ...mockGameState, maxCardsFlipped: 3 })).toEqual(true)
  })
})

test('gamePropsSelector', () => {
  expect(selectors.gamePropsSelector(mockGameState)).toEqual({
    loading: mockGameState.loading,
    finished: mockGameState.finished,
    canFlipCards: selectors.canFlipCardsSelector(mockGameState),
    isTriples: selectors.isTriplesSelector(mockGameState),
    game: {
      cards: selectors.nonMatchedCardsSelector(mockGameState),
      matchedCards: selectors.matchedSymbolsSelector(mockGameState),
      level: selectors.currentLevelNameSelector(mockGameState),
      moves: mockGameState.moves,
      time: mockGameState.time,
    },
  })
})
