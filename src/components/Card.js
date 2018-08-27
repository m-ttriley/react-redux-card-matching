import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

export const propTypes = {
  symbol: PropTypes.string,
  flipped: PropTypes.bool,
  onClick: PropTypes.func,
}

const Card = ({ symbol, flipped, onClick }) => (
  <button className={!flipped ? styles.cardDown : styles.card} onClick={onClick}>
    {flipped ? symbol : null}
  </button>
)

Card.propTypes = propTypes

export const sampleProps = {
  id: 1,
  symbol: 'a',
  flipped: false,
  onClick: () => { },
}

export default Card
