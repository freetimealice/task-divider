const router = require('express').Router()
const {Account, User} = require('../db/models/')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    console.log('in login')
    const account = await Account.findOne({where: {name: req.body.name}})
    if (!account) {
      console.log('No such account found:', req.body.name)
      res.status(401).send('Wrong username and/or password')
    } else if (!account.correctPassword(req.body.password)) {
      console.log('Incorrect password for account:', req.body.name)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(account, err => (err ? next(err) : res.json(account)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const account = await Account.create(req.body)
    req.login(account, err => (err ? next(err) : res.json(account)))

    const {user1, user2} = req.body
    await User.create({userName: user1, accountId: account.id, userNum: 1})
    await User.create({userName: user2, accountId: account.id, userNum: 2})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Account already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})
