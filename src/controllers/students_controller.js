import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import studentModel from '../models/students.js';
import {createToken} from '../middlewares/auth.js';
const saltRounds=10
const registerStudent_controller=async(req, res)=>{
    const {password, ...otherData_student}=req.body
    const hasehedPassword=await bcrypt.hash(password, saltRounds)
    const studentData={
        id: uuidv4(),
        password: hasehedPassword,
        ...otherData_student
    }
    try {
        const student=await studentModel.registerStudent_model(studentData)
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json(error)
    }
}
const loginStudent_controller=async (req, res)=>{
    const {mail, password}=req.body
    try {
        const student=await studentModel.loginStudent_model(mail, password)
        const token=createToken(student)
        res.status(200).json({student, token})
    } catch (error) {
        res.status(500).json(error)
    }
}
export {
    registerStudent_controller,
    loginStudent_controller
}