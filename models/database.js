const Sequelize = require('sequelize')
const base = require('../lib/base')
const sequelize = new Sequelize(
    base.config().mysql.database,
    base.config().mysql.username,
    base.config().mysql.password,
    {
        host: base.config().mysql.host,
        dialect: base.config().mysql.dialect,
    }
)

module.exports = sequelize
