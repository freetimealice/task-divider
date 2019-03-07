const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Account = db.define('account', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = Account

/**
 * instanceMethods
 */
Account.prototype.correctPassword = function(candidatePwd) {
  return Account.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
Account.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Account.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = account => {
  if (account.changed('password')) {
    account.salt = Account.generateSalt()
    account.password = Account.encryptPassword(
      account.password(),
      account.salt()
    )
  }
}

Account.beforeCreate(setSaltAndPassword)
Account.beforeUpdate(setSaltAndPassword)
Account.beforeBulkCreate(accounts => {
  accounts.forEach(setSaltAndPassword)
})
