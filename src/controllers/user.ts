import { Request, Response } from 'express'
import { catchAsync } from '../utils/catch-async.js'
import { userService } from '../services/index.js'

const getUsers = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const user = await userService.getUser()
    return _res.json(user)
  },
)

const getOneUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const user = await userService.getOneUser(_req.params.id)
    return _res.json(user)
  },
)

const createUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const user = await userService.createUser()
    return _res.json(user)
  },
)

export { getUsers, getOneUser, createUser }
