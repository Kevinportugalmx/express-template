import express from 'express'
import { DTO } from '../../utils/index.js'
import { ValidateMiddleware } from '../../middlewares/error/index.js'
import { authController } from '../../controllers/index.js'

const router = express.Router()

router.post('/login', ValidateMiddleware(DTO.UserLogin), authController.login)
router.post(
  '/register',
  ValidateMiddleware(DTO.UserRegister),
  authController.register,
)

export { router as authRoute }
