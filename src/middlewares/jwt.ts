import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { HttpException } from './http-exception'

export const jwtMiddleware = (
  _req: Request,
  _res: Response,
  _next: NextFunction,
): void => {
  try {
    const authHeader = _req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
      _next(new HttpException(httpStatus.UNAUTHORIZED, 'Unauthorized'))
    }

    jwt.verify(token, 's0m3_r4nd0m_k3y')

    _next()
  } catch (error) {
    _next(new HttpException(httpStatus.UNAUTHORIZED, 'Unauthorized'))
  }
}
