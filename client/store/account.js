import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ACCOUNT = 'GET_ACCOUNT'
const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'

/**
 * INITIAL STATE
 */
const defaultAccount = {}

/**
 * ACTION CREATORS
 */
const getAccount = account => ({type: GET_ACCOUNT, account})
const removeAccount = () => ({type: REMOVE_ACCOUNT})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getAccount(res.data || defaultAccount))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  name,
  password,
  method,
  user1,
  user2
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {name, password, user1, user2})
  } catch (authError) {
    return dispatch(getAccount({error: authError}))
  }

  try {
    dispatch(getAccount(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeAccount())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultAccount, action) {
  switch (action.type) {
    case GET_ACCOUNT:
      return action.account
    case REMOVE_ACCOUNT:
      return defaultAccount
    default:
      return state
  }
}
