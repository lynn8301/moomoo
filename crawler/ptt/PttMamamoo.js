const cheerio = require('cheerio')
const Sequelize = require('sequelize')
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
    __html2Json(html) {
        try {
            let $ = cheerio.load(html)
            let rows = $('#main-container > div.r-list-container.action-bar-margin.bbs-screen > div.r-ent')

            let infos = []
            for(let i = 0; i < rows.length; i++) {
                let info = {}
                info.title = ($(rows).eq(i).find('div.title') || "").text().trim()
                let linkPattern = $(rows).eq(i).find('div.title a').attr('href')
                info.link = `https://www.ptt.cc${linkPattern}`
                
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
            while(true) {
                let html = await base.rpRetry(uri)
                let infos = this.__html2Json(html)
                await Ptt.bulkCreate(infos)
                // 下一頁資訊
                let $ = cheerio.load(html)
                let nextPage = $('#action-bar-container > div > div.btn-group.btn-group-paging > a').eq(1).attr('href')
                if(nextPage == undefined) break
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