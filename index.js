const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const middleWare = require('./utils/middleware')

const mongoose = require('mongoose')

const locationsRouter = require('./controllers/locations')
const observationsRouter = require('./controllers/observations')
const defaultRouter = require('./controllers/default')

const config = require('./utils/config')

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('Connected to database')
  })
  .catch(error => {
    console.log(error)
  })

mongoose.Promise = global.Promise

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleWare.logger)

// Controllers
app.use('/api/locations', locationsRouter)
app.use('/api/observations', observationsRouter)
app.use('/', defaultRouter)

// Error middleware
app.use(middleWare.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
