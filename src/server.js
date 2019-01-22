/* eslint-disable import/first */
require('./env') // env vars setup, do not move me from this place
const express = require('express')
const logger = require('./utils/logger')
const prometheusClient = require('prom-client')
const cors = require('cors')
const bodyParser = require('body-parser').json()

const db = require('./db')
const app = express()

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

app.post('/users', async (req, res) => {
  try {
    await db.get().collection('users').insert(req.body)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

prometheusClient.collectDefaultMetrics()

const { URI } = process.env
const { PORT } = process.env

try {
  db.connect(URI).then(() => app.listen(PORT, () => logger.info(`Listening on ${PORT || 8001}`)))
} catch (err) {
  console.error(err)
}
