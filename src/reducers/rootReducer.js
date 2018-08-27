import reduceReducers from 'reduce-reducers'
import gameReducer from './gameReducer'
import apiReducer from './apiReducer'
import timerReducer from './timerReducer'
import triplesApiReducer from './triplesApiReducer'

const rootReducer = reduceReducers(gameReducer, apiReducer, timerReducer, triplesApiReducer)

export default rootReducer
