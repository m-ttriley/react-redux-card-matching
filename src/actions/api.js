import 'cross-fetch/polyfill'
import handleErrors from '../utils/utils'
import actionTypes from '../constants/ApiActionTypes'

export const url = 'https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json'

export const fetchLevelsBegin = () => ({
  type: actionTypes.FETCH_LEVELS_BEGIN,
})

export const fetchLevelsSuccess = levels => ({
  type: actionTypes.FETCH_LEVELS_SUCCESS,
  payload: { ...levels },
})

export const fetchLevelsError = error => ({
  type: actionTypes.FETCH_LEVELS_FAILURE,
  payload: { error },
})

export function fetchLevels() {
  return dispatch => {
    dispatch(fetchLevelsBegin())
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchLevelsSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchLevelsError(error)))
  }
}
