/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { logger } from './logger'
import { BadRequest } from './class-validator'

export class ErrorMiddleware {
  handleError(
    _error: any,
    _req: Request,
    _res: Response,
    _next: NextFunction,
  ): void {
    if (_error.name !== 'class-validator') {
      logger.error(`${_error.message}`, {
        _error: {
          code: _error.code,
          message: _error.message,
          stack: _error.stack,
          name: _error.name,
        },
        remote_error: _error.error
          ? {
              message: _error.error.message,
              stack: _error.error.stack,
              name: _error.error.name,
            }
          : undefined,
      })
      _res.status(_error.statusCode).json({
        statusCode: _error.statusCode,
        message: _error.message,
      })
    } else if (_error.name == 'class-validator') {
      const badRequest = _error as BadRequest
      logger.error('Bad Request', {
        http: { status_code: badRequest.code },
        _error: {
          name: badRequest.name,
          message: JSON.parse(badRequest.message),
          stack: badRequest.stack,
          status: badRequest.code,
        },
      })
      _res
        .status(badRequest.code)
        .json({ ...badRequest, message: JSON.parse(badRequest.message) })
    }
  }
}
