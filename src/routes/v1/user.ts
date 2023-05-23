import express from 'express'
import { userController } from '../../controllers/index.js'
import { DTO } from '../../utils/index.js'
import { ValidateMiddleware } from '../../middlewares/error/index.js'
import {
  JwtMiddleware,
  RolesMiddleware,
  RolesTypes,
} from '../../middlewares/auth/index.js'
import { RateLimiterMiddleware } from '../../middlewares/rate-limiter.js'

const router = express.Router()
/**
 * @swagger
 * /v1/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users.
 *
 *     responses:
 *       200:
 *         description: {Array of users}
 *         schema:
 *           type: array
 *
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

router.get(
  '/',
  JwtMiddleware,
  RolesMiddleware(RolesTypes.USER),
  RateLimiterMiddleware(3 * 60 * 1000, 3),
  userController.getUsers,
)
router.get(
  '/:id',
  JwtMiddleware,
  RolesMiddleware(RolesTypes.USER),
  userController.getOneUser,
)
router.put(
  '/update/:id',
  JwtMiddleware,
  RolesMiddleware(RolesTypes.ADMIN),
  ValidateMiddleware(DTO.UserUpdate),
  userController.updateUser,
)
router.delete(
  '/delete/:id',
  JwtMiddleware,
  RolesMiddleware(RolesTypes.ADMIN),
  ValidateMiddleware(DTO.Delete),
  userController.deleteUser,
)

export { router as userRoute }
