import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { HttpException } from '../error/http-exception'
import { config } from '../../config'

export interface ITokenData {
  _id: string
  email: string
  roles: Array<string>
}

export const JwtMiddleware = (
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

    jwt.verify(token, config.JWT.secret)

    _next()
  } catch (error) {
    _next(new HttpException(httpStatus.UNAUTHORIZED, 'Unauthorized'))
  }
}
