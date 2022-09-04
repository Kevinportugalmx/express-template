import { IUser, userModel } from '../db/models/user.js'
import { ObjectID } from 'bson'
import { HttpException } from '../utils/http-exception.js'
import httpStatus from 'http-status'

const getUser = async (): Promise<IUser[]> => {
  const user = await userModel.find().select(['-password']).lean().exec()
  return user
}

const getOneUser = async (id: string): Promise<IUser> => {
  const _id = new ObjectID(id)
  const user = await userModel
    .findOne({ _id })
    .select(['-password'])
    .lean()
    .exec()
  if (!user) {
    throw new HttpException(httpStatus.NOT_FOUND, 'USER_NOT_FOUND')
  }
  return user
}

const createUser = async (): Promise<void> => {
  console.log('inprogress')
}

export { getUser, getOneUser, createUser }
