const sequelize = require('../database')
const Sequelize = require('sequelize')
const Ptt = require('../ptt')(sequelize, Sequelize)


/**
 * Create Table
 */
async function createTable() {
    try {
        // Create Ptt Table
        await Ptt.sync()
        
    } catch (e) {
        throw new Error(e)
    } finally {
        await sequelize.close()
    }
}

module.exports = createTable
