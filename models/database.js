const Sequelize = require('sequelize')
const base = require('../lib/base')
const sequelize = new Sequelize(
    base.config().database,
    base.config().username,
    base.config().password,
    {
        host: base.config().host,
        dialect: base.config().dialect,
    }
)

module.exports = sequelize
