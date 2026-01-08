const express = require('express')
const mongoose = require('mongoose')
const moment = require('moment')
const config = require('config')

const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({ extened: true }))
mongoose.set('strictQuery', true)

// routes-api
app.use('/api/v1/auth', require('./routes/auth.routes'))
app.use('/api/v1/tests', require('./routes/test.routes'))
app.use('/api/v1/users', require('./routes/user.routes'))

async function start() {
    try {
        const mongoUri = config.get('mongoUri')
        if (!mongoUri) {
            throw new Error('mongoUri is not set')
        }
        await mongoose.connect(mongoUri)

        app.listen(PORT, () => {
            const timeServerStart = moment().format ('DD.MM.YYYY HH:mm:ss')
            console.log(`Server has been started at ${timeServerStart} on port ${PORT}.`)
        })
    } catch (e) {
        const timeServerError = moment().format ('DD.MM.YYYY HH:mm:ss')
        console.log (`Server has been stopped at ${timeServerError} due to an error.\nError: ${e.message}.`)
    }
}

start()