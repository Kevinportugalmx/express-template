import express from 'express'
import { userController } from '../controllers/index.js'

const router = express.Router()

router.route('/').get(userController.getUsers)
router.route('/:id').get(userController.getOneUser)
router.route('/create').post(userController.createUser)

export { router as userRoute }
