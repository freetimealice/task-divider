const Sequelize = require('sequelize')
const db = require('../db')

const Responsibilities = db.define('responsibilities', {
  ranking: Sequelize.INTEGER,
  taskName: Sequelize.STRING,
  week: Sequelize.INTEGER,
  userNum: Sequelize.INTEGER,
  accountId: Sequelize.INTEGER,
  won: Sequelize.INTEGER
})

module.exports = Responsibilities
