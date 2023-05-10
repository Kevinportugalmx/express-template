import { userModel } from '../db/models/user.model.js'
import { ObjectID } from 'bson'
import { HttpException } from '../middlewares/http-exception.js'
import httpStatus from 'http-status'
import { logger } from '../middlewares/logger.js'
import { DTO } from '../utils/index.js'

class UserService {
  async getUser(): Promise<DTO.UserResponse[]> {
    const user = await userModel.find().select(['-password']).lean().exec()
    return user
  }

  async getOneUser(id: string): Promise<DTO.UserResponse> {
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

  async createUser(user: DTO.UserRegister): Promise<DTO.UserResponse> {
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

  async updateUser(user: DTO.UserUpdate): Promise<DTO.UserResponse> {
    const _id = new ObjectID(user._id)
    const updatedUser = await userModel
      .findOneAndUpdate({ _id }, user, { new: true })
      .lean()
      .exec()
    if (!updatedUser) {
      throw new HttpException(httpStatus.NOT_FOUND, 'USER_NOT_FOUND')
    }
    return updatedUser
  }

  async deleteUser(data: DTO.DeleteGeneral): Promise<DTO.UserResponse> {
    const _id = new ObjectID(data._id)
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
}
export const userService = new UserService()
