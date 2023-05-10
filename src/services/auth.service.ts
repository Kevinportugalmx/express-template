import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DTO } from '../utils'
import { userModel } from '../db/models'
import httpStatus from 'http-status'
import { HttpException } from '../middlewares/error'
import { config } from '../config'
import { ITokenData } from '../middlewares/auth'

class AuthService {
  getAccessToken(payload: ITokenData): string {
    const accessToken = jwt.sign(payload, config.JWT.secret, {
      expiresIn: config.JWT.expiresIn,
    })
    return accessToken
  }

  async register(user: DTO.UserRegister): Promise<DTO.UserResponse> {
    const userExists = await userModel
      .findOne({ email: user.email })
      .lean()
      .exec()
    if (userExists) {
      throw new HttpException(httpStatus.CONFLICT, 'USER_ALREADY_EXISTS')
    }
    const hash = await bcrypt.hash(user.password, 10)
    const newUser = await userModel.create({ ...user, password: hash })
    const token = this.getAccessToken({
      _id: newUser._id,
      email: newUser.email,
      roles: newUser.roles,
    })
    return { ...newUser.toObject(), token, password: undefined }
  }

  async login(user: DTO.UserLogin): Promise<DTO.UserResponse> {
    const userExists = await userModel
      .findOne({ email: user.email })
      .select(['-password'])
      .lean()
      .exec()

    if (!userExists)
      throw new HttpException(httpStatus.NOT_FOUND, 'USER_NOT_FOUND')

    return {
      ...userExists,
      token: this.getAccessToken({
        _id: userExists._id,
        email: userExists.email,
        roles: userExists.roles,
      }),
    }
  }
}
export const authService = new AuthService()
