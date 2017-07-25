import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types'

const API_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
  return dispatch => {
    // submit email password to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // update state to indicate authd
        dispatch({ type: AUTH_USER })

        // save jwt token
        localStorage.setItem('token', response.data.token)

        // redirect to route /feature
        browserHistory.push('/feature')
      })
      .catch(() => {
        // if request is bad, show error to user
        dispatch(authError('Bad login info'))
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function signupUser({ email, password }) {
  return dispatch => {
    // submit email password to server
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/feature')
      })
      .catch(result => {
        // if request is bad, show error to user
        dispatch(authError(result.response.data.error))
      })
  }
}

export function fetchMessage() {
  return dispatch => {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    })
  }
}