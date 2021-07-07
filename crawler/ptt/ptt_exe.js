(async function () {
    const PttMamamoo = require('./PttMamamoo')
    let mamaoo = new PttMamamoo()
    let crawler = process.argv[2]
    
    try {
        let crawlerResult
        switch(crawler) {
            case 'PttMamamoo.insertMamamoo':
                crawlerResult = await mamaoo.insertMamamoo()
                break
            default:
                process.exit()
        }
    } catch (e) {
        throw new Error(e)
    }
}())