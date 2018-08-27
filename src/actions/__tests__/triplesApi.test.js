import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { url, fetchTriples } from '../../actions/triplesApi'
import actionTypes from '../../constants/TriplesApiActionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

afterEach(() => {
  fetchMock.restore()
})

test('creates FETCH_TRIPLES_SUCCESS when fetching levels has been done', () => {
  fetchMock.once(url, { payload: 'test' })
  const expectedActions = [
    { type: actionTypes.FETCH_TRIPLES_BEGIN },
    { type: actionTypes.FETCH_TRIPLES_SUCCESS, payload: { payload: 'test' } },
  ]
  const store = mockStore({ levels: [] })

  return store.dispatch(fetchTriples()).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
