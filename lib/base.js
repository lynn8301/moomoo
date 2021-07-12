const fs = require('fs')
const rp = require('request-promise')


/**
 * 讀取config
 */
function config() {
    let config_temp
    if(process.env.NODE_ENV === 'production') {
        config_temp = require(`${__dirname}/../config/config.js`)
    } else {
        config_temp = JSON.parse(fs.readFileSync(`${__dirname}/../config/development.json`))
    }
    return config_temp
}


/**
 * 延遲時間
 * @param {int} interval 延遲ms 
 */
 function timeDelay(interval) {
    return new Promise(function (resolve) {
        setTimeout(resolve, interval)
    })
}

/**
 * @param {*} opt request-promise input
 * @param {number} times retry times
 * @param {number} retryInterval retryInterval
 */
 async function rpRetry(opt, times = 3, retryInterval = 1500) {
    let error
    for (let i = 0; i < times; i++) {
        await timeDelay(retryInterval)
        try {
            let html = rp(opt)
            return html
        } catch (e) {
            error = e
        }
    }
    throw new Error(error)
}

module.exports = {
    config,
    rpRetry,
    timeDelay,
}