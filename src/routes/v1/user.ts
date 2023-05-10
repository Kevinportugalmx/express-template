import express from 'express'
import { userController } from '../../controllers/index.js'

const router = express.Router()

router.route('/').get(userController.getUsers)
router.route('/:id').get(userController.getOneUser)
router.route('/create').post(userController.createUser)
router.route('/update/:id').put(userController.updateUser)
router.route('/delete/:id').delete(userController.deleteUser)

export { router as userRoute }
