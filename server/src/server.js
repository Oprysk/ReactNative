/* eslint-disable import/first */
require('./env') // env vars setup, do not move me from this place
const express = require('express')
const logger = require('./utils/logger')
const db = require('./db')
const userRouter = require('./routes/userRoutes')
const prometheusClient = require('prom-client')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const cors = require('cors')
const bodyParser = require('body-parser').json()

const app = express()

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)
  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died. code = ${code}, signal = ${signal}`)
  })
} else {
  const corsConfig =
    process.env.USE_CORS === 'true'
      ? {
          cors: {
            origin: process.env.CORS_ORIGIN,
          },
        }
      : { cors: false }

  app.use(cors(corsConfig))
  app.use(bodyParser)

  app.get('/status', (_, res) => {
    res.sendStatus(200)
  })

  app.get('/metrics', (req, res) => {
    res.set('Content-Type', prometheusClient.register.contentType)
    res.end(prometheusClient.register.metrics())
  })

  prometheusClient.collectDefaultMetrics()

  const { URI } = process.env
  const { PORT } = process.env

  try {
    db.connect(URI).then(() =>
      app.listen(PORT, () => logger.info(`Listening on ${PORT || 8001}. Worker ${process.pid} started`)),
    )
  } catch (err) {
    console.error(err)
  }

  app.use(userRouter)
}
