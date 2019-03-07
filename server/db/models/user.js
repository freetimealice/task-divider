const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userNum: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = User
