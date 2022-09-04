import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
export const catchAsync =
  (fn) =>
  (_req: Request, _res: Response, _next: NextFunction): void => {
    Promise.resolve(fn(_req, _res, _next)).catch((err) => {
      console.error(err)
      _res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      })
    })
  }
