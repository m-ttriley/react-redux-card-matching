import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { url, fetchLevels } from '../../actions/api'
import actionTypes from '../../constants/ApiActionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

afterEach(() => {
  fetchMock.restore()
})

test('creates FETCH_LEVELS_SUCCESS when fetching levels has been done', () => {
  fetchMock.once(url, { payload: 'test' })
  const expectedActions = [
    { type: actionTypes.FETCH_LEVELS_BEGIN },
    { type: actionTypes.FETCH_LEVELS_SUCCESS, payload: { payload: 'test' } },
  ]
  const store = mockStore({ levels: [] })

  return store.dispatch(fetchLevels()).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
