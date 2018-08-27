import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

const GameFinish = ({ moves, time, restartGame }) => (
  <div className={styles.gamefinish}>
    <h1>You finished in:</h1>
    <ul>
      <li>{moves} moves</li>
      <li>{time} seconds</li>
    </ul>
    <button className={styles.btnRed} onClick={restartGame}>
      PLAY AGAIN
    </button>
  </div>
)

GameFinish.propTypes = {
  moves: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  restartGame: PropTypes.func.isRequired,
}

export const sampleProps = {
  moves: 2,
  time: 10,
  restartGame: () => {},
}

export default GameFinish
