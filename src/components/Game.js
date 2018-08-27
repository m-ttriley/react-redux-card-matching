import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingDiv from './LoadingDiv'
import Header from './Header'
import GameFinish from './GameFinish'
import GameBoard, { propTypes as gameBoardProps, sampleProps as sampleGameProps } from './GameBoard'
import styles from './styles.scss'

class Game extends Component {
  componentDidMount() {
    this.props.fetchLevels()
  }

  componentDidUpdate() {
    if (this.props.finished) {
      this.props.checkGameState()
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div className={styles.app}>
          <Header />
          <LoadingDiv className={styles.loadingdiv} />
        </div>
      )
    }
    return (
      <div className={styles.app}>
        <Header />
        {!this.props.finished ? (
          <GameBoard
            {...this.props.game}
            onCardClick={this.props.canFlipCards ? this.props.onCardClick : () => {}}
            checkGameState={this.props.checkGameState}
            resetBoard={this.props.resetBoard}
            fetchCards={this.props.isTriples ? this.props.fetchLevels : this.props.fetchTriples}
            fetchCardsText={this.props.isTriples ? 'TRY PAIRS' : 'TRY TRIPLES'}
            tick={this.props.tick}
          />
        ) : (
          <GameFinish {...this.props.game} restartGame={this.props.fetchLevels} />
        )}
      </div>
    )
  }
}

Game.propTypes = {
  loading: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  canFlipCards: PropTypes.bool.isRequired,
  isTriples: PropTypes.bool.isRequired,
  fetchLevels: PropTypes.func.isRequired,
  fetchTriples: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  checkGameState: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired,
  game: PropTypes.shape({ ...gameBoardProps }),
}

export const sampleProps = {
  loading: false,
  finished: false,
  isTriples: false,
  fetchLevels: () => {},
  fetchTriples: () => {},
  checkGameState: () => {},
  onCardClick: () => {},
  canFlipCards: true,
  resetBoard: () => {},
  tick: () => {},
  game: sampleGameProps,
}

export default Game
