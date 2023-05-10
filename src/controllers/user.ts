import { Request, Response } from 'express'
import { catchAsync } from '../middlewares/catch-async.js'
import { userService } from '../services/index.js'
import { logger } from '../middlewares/logger.js'

const getUsers = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    logger.error('This is an error message')
    logger.warn('This is a warning message')
    logger.info('This is an info message')
    const response = await userService.getUser()
    return _res.json(response)
  },
)

const getOneUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.getOneUser(_req.params.id)
    return _res.json(response)
  },
)

const createUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.createUser(_req.body)
    return _res.json(response)
  },
)

const updateUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.updateUser(_req.params.id, _req.body)
    return _res.json(response)
  },
)

const deleteUser = catchAsync(
  async (_req: Request, _res: Response): Promise<Response> => {
    const response = await userService.deleteUser(_req.params.id)
    return _res.json(response)
  },
)

export { getUsers, getOneUser, createUser, updateUser, deleteUser }
