import { Request, Response } from 'express'
import { catchAsync } from '../middlewares/catch-async.js'
import { userService } from '../services/index.service.js'

export const getUsers = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.getUser()
    return _res.json(response)
  },
)

export const getOneUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.getOneUser(_req.params.id)
    return _res.json(response)
  },
)

export const createUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.createUser(_req.body)
    return _res.json(response)
  },
)

export const updateUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.updateUser(_req.body)
    return _res.json(response)
  },
)

export const deleteUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.deleteUser({ _id: _req.params.id })
    return _res.json(response)
  },
)
