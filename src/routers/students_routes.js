import {Router} from 'express'
import {loginStudent_controller, registerStudent_controller, updateStudent_controller, getStudentID_controller, deleteStudent_controller, getStudent_controller} from '../controllers/students_controller.js'
import {verifyToken} from '../middlewares/auth.js'
const router=Router()
//rutas públicas
router.post('/students/register', registerStudent_controller)
router.post('/students/login', loginStudent_controller)
//rutas privadas
router.get('/students/:id', getStudentID_controller)
router.get('/students/:id', getStudent_controller)
router.put('/students/:id', verifyToken, updateStudent_controller)
router.delete('/students/:id', verifyToken, deleteStudent_controller)
export default router