import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { logger } from './logger'
export const catchAsync =
  (fn) =>
  (_req: Request, _res: Response, _next: NextFunction): void => {
    Promise.resolve(fn(_req, _res, _next)).catch((err) => {
      logger.error({
        path: _req.originalUrl,
        method: _req.method,
        error: err,
        message: err.message,
      })
      _res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      })
    })
  }
