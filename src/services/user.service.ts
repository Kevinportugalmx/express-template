import { userModel } from '../db/models/user.model.js'
import { ObjectID } from 'bson'
import { HttpException } from '../middlewares/error/http-exception.js'
import httpStatus from 'http-status'
import { DTO } from '../utils/index.js'

class UserService {
  async getUser(): Promise<DTO.UserResponse[]> {
    const user = await userModel.find().lean().exec()
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

  async deleteUser(data: DTO.Delete): Promise<DTO.UserResponse> {
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
