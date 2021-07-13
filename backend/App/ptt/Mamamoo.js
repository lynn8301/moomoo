const Sequelize = require('sequelize')
const Utility = require('../../Common/Utility')
const sequelize = require('../../../models/database')
const Ptt = require('../../../models/ptt')(sequelize, Sequelize)


class PttMamamooTable {
    /**
     * Get Data
     */
    static async getMamamoo(params) {
        let apiResult = Utility.initialApiResult()
        try {
            let conditions = {}            
            if(params.type) {
                conditions['type'] = params.type
            }

            let data
            if(!params.query_all) {
                let page = parseInt(params.page)
                let limit = parseInt(params.limit)
                let offset = limit * (page - 1)

                data = await Ptt.findAll({
                    where: conditions,
                    offset: offset,
                    limit: limit,
                    order: [[params.by, params.order]]
                })
            } else {
                data = await Ptt.findAll({
                    where: conditions,
                    order: [[params.by, params.order]]
                })
            }

            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
            apiResult.payload = data
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message
        }
        return apiResult
    }
}


module.exports = PttMamamooTable