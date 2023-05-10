import express, { NextFunction, Request, Response } from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import { routes } from './routes/v1/index.js'
import { config } from './config.js'
import { dbConnection } from './db/connection.js'
import { requestMiddleware } from './middlewares/request.js'
import bodyParser from 'body-parser'
import { ErrorMiddleware } from './middlewares/error.js'

const app = express()

const server = http.createServer(app)

app.use(
  cors(),
  helmet(),
  requestMiddleware(),
  express.urlencoded({ extended: true }),
  express.json(),
  bodyParser.json(),
)
app.options('*', cors())
app.use('/v1', routes)

const errorMiddleware = new ErrorMiddleware()
app.use((_error: Error, _req: Request, _res: Response, _next: NextFunction) =>
  errorMiddleware.handleError(_error, _req, _res, _next),
)
//TODO
// rate limiter
// swagger
// dockerizar
// agregar cache de redis
// unit tests (jest)
// e2e tests (supertest)

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
