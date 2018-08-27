import React from 'react'
import styles from './styles.scss'

const LoadingDiv = () => (
  <div className={styles.loadingdiv}>
    <h1>LOADING</h1>
    <div className={styles.spinner} />
  </div>
)

export default LoadingDiv
