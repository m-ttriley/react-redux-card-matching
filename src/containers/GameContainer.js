import { connect } from 'react-redux'
import { flipCardUp, flipCardDown, checkGameState, resetBoard } from '../actions/actions'
import { fetchLevels } from '../actions/api'
import { fetchTriples } from '../actions/triplesApi'
import { gamePropsSelector } from '../selectors/gameSelectors'
import { tick } from '../actions/timerActions'
import Game from '../components/Game'

const mapStateToProps = state => ({
  ...gamePropsSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchLevels: () => {
    dispatch(fetchLevels())
  },
  fetchTriples: () => {
    dispatch(fetchTriples())
  },
  resetBoard: () => {
    dispatch(resetBoard())
  },
  onCardClick: (id, flipped) => {
    if (flipped) {
      dispatch(flipCardDown(id))
    } else {
      dispatch(flipCardUp(id))
    }
  },
  checkGameState: () => {
    dispatch(checkGameState())
  },
  tick: () => {
    dispatch(tick())
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Game)
