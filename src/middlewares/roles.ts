/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { HttpException } from './http-exception'
import httpStatus from 'http-status'

export const RolesTypes = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}
export const adminRoles = [RolesTypes.ADMIN]
export const userRoles = [RolesTypes.USER, ...adminRoles]

const decodeToken = (token: string): { email: string; roles: string } => {
  const decode = jwt.decode(token)
  return JSON.parse(JSON.stringify(decode))
}

export const rolesMiddleware = (
  _req: Request,
  _res: Response,
  _next: NextFunction,
): void => {
  const authHeader = _req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = decodeToken(token)
  if (!adminRoles.includes(decoded.roles)) {
    _next(new HttpException(httpStatus.FORBIDDEN, 'Forbidden'))
  }
  _next()
}
