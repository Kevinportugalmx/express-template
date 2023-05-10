import { Request, Response } from 'express'
import { catchAsync } from '../middlewares/error/catch-async.js'
import { authService } from '../services/auth.service.js'

export const register = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await authService.register(_req.body)
    return _res.json(response)
  },
)

export const login = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await authService.login(_req.body)
    return _res.json(response)
  },
)
