import { IUser, userModel } from '../db/models/user.js'
import { ObjectID } from 'bson'
import { HttpException } from '../middlewares/http-exception.js'
import httpStatus from 'http-status'
import { logger } from '../middlewares/logger.js'

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

const createUser = async (user: any): Promise<IUser> => {
  const userExists = await userModel
    .findOne({ email: user.email })
    .lean()
    .exec()

  if (userExists) {
    throw new HttpException(httpStatus.CONFLICT, 'USER_ALREADY_EXISTS')
  }

  const newUser = await userModel.create(user)
  logger.info(`User ${newUser._id} created`)
  return newUser
}

const updateUser = async (id: string, user: any): Promise<IUser> => {
  const _id = new ObjectID(id)
  const updatedUser = await userModel
    .findOneAndUpdate({ _id }, user, { new: true })
    .lean()
    .exec()
  if (!updatedUser) {
    throw new HttpException(httpStatus.NOT_FOUND, 'USER_NOT_FOUND')
  }
  return updatedUser
}

const deleteUser = async (id: string): Promise<IUser> => {
  const _id = new ObjectID(id)
  const deletedUser = await userModel
    .findOneAndDelete({ _id })
    .select(['-password'])
    .lean()
    .exec()
  if (!deletedUser) {
    throw new HttpException(httpStatus.NOT_FOUND, 'USER_NOT_FOUND')
  }
  return deletedUser
}

export { getUser, getOneUser, createUser, updateUser, deleteUser }
