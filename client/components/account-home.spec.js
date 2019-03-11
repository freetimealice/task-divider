/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AccountHome} from './account-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AccountHome', () => {
  let accountHome

  beforeEach(() => {
    accountHome = shallow(<AccountHome name="cody@name.com" />)
  })

  xit('renders the name in an h3', () => {
    expect(accountHome.find('h3').text()).to.be.equal('Welcome, cody@name.com')
  })
})
