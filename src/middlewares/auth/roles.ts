/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { HttpException } from '../error/http-exception'
import httpStatus from 'http-status'
import { ITokenData } from './jwt'

export const RolesTypes = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

export const decodeToken = (token: string): ITokenData => {
  const decode = jwt.decode(token)
  return JSON.parse(JSON.stringify(decode))
}

export const RolesMiddleware = (...roles: Array<string>) => {
  return (_req: Request, _res: Response, _next: NextFunction): void => {
    const authHeader = _req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = decodeToken(token)
    if (!decoded.roles.every((role) => roles.includes(role))) {
      _next(new HttpException(httpStatus.FORBIDDEN, 'Forbidden'))
    }
    _next()
  }
}
