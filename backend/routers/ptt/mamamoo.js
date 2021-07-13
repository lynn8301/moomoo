const express = require('express')
const PttMamamooTable = require('../../App/ptt/Mamamoo')

const router = express.Router()

/**
 * Create new post
 * @param {*} params
 */
router.get('/ptt/mamamoo', async(req, res) => {
    let params = req.query

    if(undefined == params.limit) params.limit = 100
    if(undefined == params.order) params.order = 'DESC'
    if(undefined == params.by) params.by = 'date'
    if(undefined == params.page) params.page = 1
    if(undefined == params.type) params.type = ''
    if(undefined == params.query_all) params.query_all = false

    let result = await PttMamamooTable.getMamamoo(params)
    res.json(result)
})


module.exports = router