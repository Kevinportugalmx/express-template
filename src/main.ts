import express from 'express'
import http from 'http'
import cors from 'cors'
import { config } from './config.js'
import { dbConnection } from './db/connection.js'
import { user } from './controllers/user.js'
import 'dotenv/config'

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())
//routes
app.use('/api/v1/user', user)

export const bootstrap = async (): Promise<void> => {
  const db = dbConnection()
  db.once('open', async () => {
    console.log('Moongose connected successfully')
    server.listen(config.Port, () => {
      console.log(`Express is listening on http://localhost:${config.Port}`)
    })
  })
}
bootstrap()

//https://github.com/hagopj13/node-express-boilerplate
//jwt auth guard
//class validator
//middleware: rate-limiter
