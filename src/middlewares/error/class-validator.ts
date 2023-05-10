import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

export class BadRequest extends Error {
  public code: number

  constructor(message: Array<string>) {
    super(JSON.stringify(message))
    this.code = httpStatus.BAD_REQUEST
    this.name = 'BadRequest'
  }
}

export const ValidateMiddleware = <T>(DTO: new () => T) => {
  return async (
    _req: Request,
    _res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const { method, query, body } = _req
    const dtoInstance = Object.assign(
      new DTO(),
      method.toLowerCase() === 'get' ? query : body,
    )

    const exceptions = await validate(dtoInstance)

    if (exceptions.length > 0) {
      const errors = exceptions.flatMap((error) =>
        Object.values(error.constraints || {}),
      )
      _next(new BadRequest(errors))
      return
    }

    _next()
  }
}
