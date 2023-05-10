import { Request, Response, NextFunction } from 'express'
import { logger } from './logger'

export const requestMiddleware =
  () =>
  (_req: Request, _res: Response, _next: NextFunction): void => {
    const { ip, method, originalUrl, query, body } = _req

    logger.info('http request received', {
      network: {
        client: {
          ip,
        },
      },
      http: {
        method,
        url: originalUrl,
        query: JSON.stringify(query),
        body,
      },
    })

    _res.on('close', () => {
      const { statusCode } = _res
      logger.info('http request finished', {
        network: {
          client: {
            ip,
          },
        },
        http: {
          status_code: statusCode,
          url: originalUrl,
        },
      })
    })

    _next()
  }
