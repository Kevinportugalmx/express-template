import mongoose from 'mongoose'

export interface IUserDocument extends mongoose.Document {
  _id: string
  email: string
  password: string
  roles: Array<string>
  status: string
}

export const User = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      lowerCase: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    roles: { type: [mongoose.SchemaTypes.String], default: ['USER'] },
    status: { type: mongoose.SchemaTypes.String, default: 'active' },
  },
  {
    timestamps: true,
  },
)

export const userModel = mongoose.model<IUserDocument & mongoose.Document>(
  'User',
  User,
)
