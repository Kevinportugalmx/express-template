import mongoose from 'mongoose'

export interface IUser {
  _id: string
  email: string
  password: string
}

const User = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const userModel = mongoose.model<IUser & mongoose.Document>('User', User)
