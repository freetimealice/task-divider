/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './account'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {account: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET ACCOUNT action', async () => {
      const fakeAccount = {name: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeAccount)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ACCOUNT')
      expect(actions[0].account).to.be.deep.equal(fakeAccount)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_ACCOUNT action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_ACCOUNT')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
