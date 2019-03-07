const Account = require('./account')
const User = require('./user')
const Task = require('./task')
const Responsibilities = require('./responsibilities')

Task.belongsTo(Account)
Account.hasMany(Task)

User.belongsTo(Account)
Account.hasMany(User)

User.belongsToMany(Task, {through: 'responsibilities'})
Task.belongsToMany(User, {through: 'responsibilities'})

module.exports = {
  Account,
  User,
  Task,
  Responsibilities
}
