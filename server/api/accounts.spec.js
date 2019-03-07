/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Account = db.model('account')

describe('Account routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/accounts/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Account.create({
        name: codysEmail
      })
    })

    it('GET /api/accounts', async () => {
      const res = await request(app)
        .get('/api/accounts')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(codysEmail)
    })
  }) // end describe('/api/accounts')
}) // end describe('Account routes')
