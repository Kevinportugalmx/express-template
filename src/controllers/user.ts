import { Request, Response, Router } from 'express'
import { userModel } from '../db/models/user.js'
import { ObjectID } from 'bson'

export const user = Router()

user
  .route('/')
  .get(async (_req: Request, _res: Response): Promise<Response> => {
    const user = await userModel.find().select(['-password']).lean().exec()
    return _res.json(user)
  })
user
  .route('/:id')
  .get(async (_req: Request, _res: Response): Promise<Response> => {
    const _id = new ObjectID(_req.params.id)
    const user = await userModel
      .findOne({ _id })
      .select(['-password'])
      .lean()
      .exec()
    if (!user) {
      return _res.status(404).json({ message: 'USER_NOT_FOUND' })
    }
    return _res.json(user)
  })
user
  .route('/create')
  .post(async (_req: Request, _res: Response): Promise<Response> => {
    return _res.json(_req.body)
  })
