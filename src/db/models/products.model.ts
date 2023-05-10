import mongoose from 'mongoose'

export interface IProductDocument extends mongoose.Document {
  _id: string
  name: string
  description: string
  price: number
  status: string
}

export const ProductSchema = new mongoose.Schema<IProductDocument>({
  name: { type: mongoose.SchemaTypes.String, required: true, upperCase: true },
  description: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  price: { type: mongoose.SchemaTypes.Number, required: true },
  status: { type: mongoose.SchemaTypes.String, default: 'active' },
})

export const ProductModule = mongoose.model('product', ProductSchema)
