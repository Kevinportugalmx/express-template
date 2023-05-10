import { Exclude } from 'class-transformer'
import {
  Allow,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class UserResponse {
  @Allow()
  _id: string
  @Allow()
  email: string
  @Allow()
  status: string
  @Allow()
  roles: Array<string>
  @Exclude()
  password?: string
  @Allow()
  token?: string
}

export class UserLogin {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class UserRegister {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class UserUpdate {
  @IsNotEmpty()
  @IsMongoId()
  _id: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString({ each: true })
  roles: Array<string>
}
