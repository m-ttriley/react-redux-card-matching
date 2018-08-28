import gameReducer from '../gameReducer'
import actionTypes from '../../constants/GameActionTypes'
import initialState from '../constants'

const mockGameState = {
  ...initialState,
  levels: ['easy', 'hard'],
  currentLevel: 0,
  matchedCards: [],
  moves: 0,
  maxCardsFlipped: 2,
  cardsFlipped: 0,
  cards: {
    easy: [
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
        matched: false,
        symbol: 'b',
      },
      {
        id: 4,
        flipped: false,
        matched: false,
        symbol: 'b',
      },
    ],
    hard: [
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
    ],
  },
}

describe('FLIP_CARD_UP', () => {
  it('flips the correct card based on current level', () => {
    expect(gameReducer(mockGameState, { type: actionTypes.FLIP_CARD_UP, id: 1 })).toEqual({
      ...mockGameState,
      moves: 1,
      cardsFlipped: 1,
      cards: {
        ...mockGameState.cards,
        easy: [
          {
            id: 1,
            flipped: true,
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
            matched: false,
            symbol: 'b',
          },
          {
            id: 4,
            flipped: false,
            matched: false,
            symbol: 'b',
          },
        ],
      },
    })
  })
})

describe('FLIP_CARD_DOWN', () => {
  it('flips the correct card down based on current level', () => {
    expect(
      gameReducer(
        {
          ...mockGameState,
          cardsFlipped: 1,
          moves: 1,
          cards: {
            ...mockGameState.cards,
            easy: [
              {
                id: 1,
                flipped: true,
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
                matched: false,
                symbol: 'b',
              },
              {
                id: 4,
                flipped: false,
                matched: false,
                symbol: 'b',
              },
            ],
          },
        },
        { type: actionTypes.FLIP_CARD_DOWN, id: 1 }
      )
    ).toEqual({ ...mockGameState, moves: 2 })
  })
})

describe('CHECK_GAME_STATE', () => {
  it('sets finished to true if game is over', () => {
    expect(
      gameReducer({ ...mockGameState, currentLevel: 2 }, { type: actionTypes.CHECK_GAME_STATE })
    ).toEqual({
      ...mockGameState,
      currentLevel: 2,
      finished: true,
    })
  })
  it('progresses to the next level if user finds all matches', () => {
    expect(
      gameReducer(
        { ...mockGameState, matchedCards: ['a', 'a', 'b', 'b'] },
        { type: actionTypes.CHECK_GAME_STATE }
      )
    ).toEqual({
      ...mockGameState,
      matchedCards: [],
      currentLevel: 1,
    })
  })
  it('adds symbol to matchedCards if both are flipped', () => {
    expect(
      gameReducer(
        {
          ...mockGameState,
          cards: {
            ...mockGameState.cards,
            easy: [
              {
                id: 1,
                flipped: true,
                matched: false,
                symbol: 'a',
              },
              {
                id: 2,
                flipped: true,
                matched: false,
                symbol: 'a',
              },
              {
                id: 3,
                flipped: false,
                matched: false,
                symbol: 'b',
              },
              {
                id: 4,
                flipped: false,
                matched: false,
                symbol: 'b',
              },
            ],
          },
        },
        { type: actionTypes.CHECK_GAME_STATE }
      )
    ).toEqual({
      ...mockGameState,
      cards: {
        ...mockGameState.cards,
        easy: [
          {
            id: 1,
            flipped: false,
            matched: true,
            symbol: 'a',
          },
          {
            id: 2,
            flipped: false,
            matched: true,
            symbol: 'a',
          },
          {
            id: 3,
            flipped: false,
            matched: false,
            symbol: 'b',
          },
          {
            id: 4,
            flipped: false,
            matched: false,
            symbol: 'b',
          },
        ],
      },
      matchedCards: [1, 2],
    })
  })
  it('turns cards back over if there is no match', () => {
    expect(
      gameReducer(
        {
          ...mockGameState,
          cards: {
            ...mockGameState.cards,
            easy: [
              {
                id: 1,
                flipped: true,
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
                flipped: true,
                matched: false,
                symbol: 'b',
              },
              {
                id: 4,
                flipped: false,
                matched: false,
                symbol: 'b',
              },
            ],
          },
        },
        { type: actionTypes.CHECK_GAME_STATE }
      )
    ).toEqual(mockGameState)
  })
})

describe('RESET BOARD', () => {
  it('resets the board correctly', () => {
    expect(
      gameReducer(
        {
          ...mockGameState,
          cards: {
            ...mockGameState.cards,
            easy: [
              {
                id: 1,
                flipped: false,
                matched: true,
                symbol: 'a',
              },
              {
                id: 2,
                flipped: false,
                matched: true,
                symbol: 'a',
              },
              {
                id: 3,
                flipped: false,
                matched: false,
                symbol: 'b',
              },
              {
                id: 4,
                flipped: false,
                matched: false,
                symbol: 'b',
              },
            ],
          },
          matchedCards: [1, 2],
        },
        { type: actionTypes.RESET_BOARD }
      )
    ).toEqual(mockGameState)
  })
})
