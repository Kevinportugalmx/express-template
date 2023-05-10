import express from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import { routes } from './routes/v1/index.js'
import { config } from './config.js'
import { dbConnection } from './db/connection.js'

const app = express()

const server = http.createServer(app)

app.use(cors())
app.options('*', cors())
app.use(helmet())
app.use(express.json())
app.use('/v1', routes)

//TODO
// jwt authentication
// class validator
// rate limiter
// swagger
// dockerizar
// agregar cache de redis

export const bootstrap = async (): Promise<void> => {
  const db = dbConnection()
  db.once('open', async () => {
    console.log('Connected to MongoDB')
    server.listen(config.Port, () => {
      console.log(`Express is listening on http://localhost:${config.Port}`)
    })
  })
}
bootstrap()
