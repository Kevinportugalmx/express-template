import express from 'express'
import { userController } from '../../controllers/index.js'
import { jwtMiddleware } from '../../middlewares/jwt.js'
import { rolesMiddleware } from '../../middlewares/roles.js'
import { validateMiddleware } from '../../middlewares/class-validator.js'
import { DTO } from '../../utils/index.js'

const router = express.Router()

router.route('/').get(jwtMiddleware, rolesMiddleware, userController.getUsers)
router
  .route('/:id')
  .get(jwtMiddleware, rolesMiddleware, userController.getOneUser)
router
  .route('/create')
  .post(validateMiddleware(DTO.UserRegister), userController.createUser)
router
  .route('/update/:id')
  .put(jwtMiddleware, rolesMiddleware, userController.updateUser)
router
  .route('/delete/:id')
  .delete(jwtMiddleware, rolesMiddleware, userController.deleteUser)

export { router as userRoute }
