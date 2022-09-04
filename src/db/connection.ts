import mongoose, { Connection } from 'mongoose'
import { config } from '../config.js'

export const dbConnection = (): Connection => {
  const options = {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    url: config.MongoUrl,
  }
  mongoose.connect(options.url)

  return mongoose.connection
}
