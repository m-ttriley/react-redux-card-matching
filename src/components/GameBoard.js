import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Timer from './Timer'
import Card, { propTypes as cardPropTypes, sampleProps as sampleCardProps } from './Card'
import styles from './styles.scss'

class GameBoard extends Component {
  componentDidMount() {
    this.checkGame = setInterval(this.props.checkGameState, 1000)
    this.tick = setInterval(this.props.tick, 1000)
  }

  componentDidUpdate(prevProps) {
    if (this.props.level !== prevProps.level) {
      this.props.checkGameState()
    }
  }

  componentWillUnmount() {
    clearInterval(this.tick)
    clearInterval(this.checkGame)
  }

  render() {
    return (
      <div>
        <div className={styles.details}>
          <Timer className={styles.timer} time={this.props.time} />
          <h1>Moves: {this.props.moves}</h1>
          <h1>Level: &quot;{this.props.level}&quot;</h1>
          <h1> Matched: {this.props.matchedCards} </h1>
          <br />
          <button className={styles.btnGreen} onClick={this.props.resetBoard}>
            RESET LEVEL
          </button>
        </div>
        <div className={styles.gameboard}>
          <ul>
            {this.props.cards
              ? this.props.cards.map(card => (
                  <Card
                    key={card.id}
                    {...card}
                    onClick={() => this.props.onCardClick(card.id, card.flipped)}
                  />
                ))
              : null}
          </ul>
        </div>
      </div>
    )
  }
}

export const propTypes = {
  time: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape(cardPropTypes)).isRequired,
  matchedCards: PropTypes.arrayOf(PropTypes.string).isRequired,
  moves: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
  checkGameState: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired,
}

export const sampleProps = {
  time: 10,
  cards: [sampleCardProps, { ...sampleCardProps, id: 2 }],
  matchedCards: [],
  moves: 2,
  level: 'one',
  onCardClick: () => {},
  checkGameState: () => {},
  resetBoard: () => {},
  tick: () => {},
}

GameBoard.propTypes = propTypes

export default GameBoard
