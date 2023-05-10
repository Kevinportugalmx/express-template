import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class UserResponse {
  _id: string
  email: string
  status: string
  roles: Array<string>
  password?: string
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

  @IsNotEmpty()
  @IsString({ each: true })
  roles: Array<string>
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
