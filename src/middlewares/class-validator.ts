import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

export class BadRequest extends Error {
  public code: number

  constructor(message: Array<string>) {
    super(JSON.stringify(message))
    this.code = httpStatus.BAD_REQUEST
    this.name = 'class-validator'
  }
}

export const validateMiddleware = (DTO) => {
  return async (
    _req: Request,
    _res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const dtoInstance = Object.assign(
      new DTO(),
      _req.method.toLowerCase() == 'get' ? _req.query : _req.body,
    )

    const exceptions = await validate(dtoInstance)

    if (exceptions.length > 0) {
      const errors: string[] = []
      exceptions.forEach((error) =>
        errors.push(
          ...Object.values(
            error.constraints as {
              [type: string]: string
            },
          ),
        ),
      )
      _next(new BadRequest(errors))
    }

    _next()
  }
}
