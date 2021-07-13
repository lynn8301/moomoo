const cheerio = require('cheerio')
const Sequelize = require('sequelize')
const moment = require('moment')
const base = require('../../lib/base')
const sequelize = require('../../models/database')
const Ptt = require('../../models/ptt')(sequelize, Sequelize)


class PttMamamoo {
    constructor(debug = false) {
        this.debug = debug
        this.uri = 'https://www.ptt.cc/bbs/MAMAMOO/index.html'
    }

    /**
     * html2Json
     * @param {*} html
     */
    async __html2Json(html) {
        try {
            let $ = cheerio.load(html)
            let rows = $('#main-container > div.r-list-container.action-bar-margin.bbs-screen > div.r-ent')

            let infos = []
            for(let i = 0; i < rows.length; i++) {
                let info = {}
                info.title = ($(rows).eq(i).find('div.title') || "").text().trim()
                let linkPattern = $(rows).eq(i).find('div.title a').attr('href')
                info.link = `https://www.ptt.cc${linkPattern}`
                info.uni_id =  info.link.split('/').pop().replace(/.html/g,'')

                let html2 = await base.rpRetry(info.link)
                let $2 = cheerio.load(html2)
                let date = ($2('#main-content div').eq(3).find('span.article-meta-value').text() || "")
                date = moment(date, 'ddd MMM D kk:mm:ss YYYY').format('YYYY-MM-DD kk:mm:ss')
                info.date = date
                                
                if (/\[影音\]/.test(info.title)) info.type = "video"
                if (/\[LIVE\]/.test(info.title)) info.type = "live"
                if (!/\[影音\]|\[LIVE\]/.test(info.title)) continue

                infos.push(info)
            }

            return infos
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * 取得PTT版上的媽媽木影音連結
     */
    async __getMamaooVideos() {
        try {
            let uri = this.uri
            let next = true
            while(next) {
                let html = await base.rpRetry(uri)
                let infos = await this.__html2Json(html)
                
                for(let info of infos) {
                    let existed = await Ptt.findAll({
                        where: {
                            uni_id: info.uni_id
                        }
                    })
                    if(existed == 0) {
                        await Ptt.create(info)
                    } else {
                        next = false
                    }
                }
                
                // 下一頁資訊
                let $ = cheerio.load(html)
                let nextPage = $('#action-bar-container > div > div.btn-group.btn-group-paging > a').eq(1).attr('href')
                if(nextPage == undefined) next = false
                uri = `https://www.ptt.cc${nextPage}` 
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * 主程式
     */
    async insertMamamoo() {
        try {
            await this.__getMamaooVideos()
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = PttMamamoo