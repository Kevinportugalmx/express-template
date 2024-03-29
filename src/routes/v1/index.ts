import express from 'express'
import { userRoute } from './user.js'
import { productsRoute } from './products.js'
import { authRoute } from './auth.js'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/products',
    route: productsRoute,
  },
]

//map routes
routes.forEach(({ path, route }) => {
  router.use(path, route)
})

//return not found error if route not found
router.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
    error: 'Not Found',
  })
})

export { router as routes }
