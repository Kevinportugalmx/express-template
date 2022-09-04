import express from 'express'
import { userRoute } from './user.js'

const router = express.Router()

const routes = [
  {
    path: '/user',
    route: userRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

export { router as routes }
