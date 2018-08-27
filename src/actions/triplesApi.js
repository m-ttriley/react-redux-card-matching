import 'cross-fetch/polyfill'
import { handleErrors } from '../utils/utils'
import actionTypes from '../constants/TriplesApiActionTypes'

export const url = 'https://web-code-test-dot-nyt-games-prd.appspot.com/triples.json'

export const fetchTriplesBegin = () => ({
  type: actionTypes.FETCH_TRIPLES_BEGIN,
})

export const fetchTriplesSuccess = levels => ({
  type: actionTypes.FETCH_TRIPLES_SUCCESS,
  payload: { ...levels },
})

export const fetchTriplesError = error => ({
  type: actionTypes.FETCH_TRIPLES_FAILURE,
  payload: { error },
})

export function fetchTriples() {
  return dispatch => {
    dispatch(fetchTriplesBegin())
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchTriplesSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchTriplesError(error)))
  }
}
