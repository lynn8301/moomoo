const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const pttMamamooRouter = require('./routers/ptt/mamamoo')

const port = process.env.PORT || 8080
const app = express()
const corsOptions = {
    origin: 'http://localhost:8080'
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true }))
app.use(cors(corsOptions))
app.use(pttMamamooRouter)

app.get('/', async(req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`)
})