import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../../reducers/rootReducer'
import GameContainer from '../../containers/GameContainer'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
const App = () => (
  <div>
    <Provider store={store}>
      <GameContainer />
    </Provider>
  </div>
)

export default App
