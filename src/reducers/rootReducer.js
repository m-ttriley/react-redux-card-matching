import reduceReducers from 'reduce-reducers'
import gameReducer from './gameReducer'
import apiReducer from './apiReducer'
import timerReducer from './timerReducer'

const rootReducer = reduceReducers(gameReducer, apiReducer, timerReducer)

export default rootReducer
