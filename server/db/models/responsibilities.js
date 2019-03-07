const Sequelize = require('sequelize')
const db = require('../db')

const Responsibilities = db.define('responsibilities', {
  ranking: Sequelize.INTEGER,
  taskName: Sequelize.STRING
})

module.exports = Responsibilities
