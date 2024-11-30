import {Router} from 'express'
import {loginStudent_controller, registerStudent_controller} from '../controllers/students_controller.js'
const router=Router()
router.post('/students/register', registerStudent_controller)
router.post('/students/login', loginStudent_controller)
export default router