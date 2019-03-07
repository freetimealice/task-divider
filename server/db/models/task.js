const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  week: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  notes: {
    type: Sequelize.TEXT
  },
  frequency: {
    type: Sequelize.INTEGER
  },
  duration: {
    type: Sequelize.INTEGER
  },
  totalTime: {
    type: Sequelize.INTEGER
  }
})

module.exports = Task
