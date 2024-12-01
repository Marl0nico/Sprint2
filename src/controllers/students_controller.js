import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import studentModel from '../models/students.js';
import {createToken} from '../middlewares/auth.js';
import {v2 as cloudinary} from 'cloudinary'
//import { stat } from 'fs-extra';
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


const updateStudent_controller=async (req, res)=>{
    const {id}=req.params
    try {
        const student=await studentModel.updateStudent_model(id, req.body)
        res.status(200).json(student)
    } catch (error) {
        req.status(500).json(error)
    }
}


/*const getStudentID_controller=async (req, res)=>{
    const {id}=req.params
    try {
        const student=await studentModel.getStudentID_model(id)
        const status=tour.error? 404: 200
        res.status(status).json(student)
    } catch (error) {
        res.status(500).json(error)
    }
}*/


const deleteStudent_controller=async (req, res)=>{
    const {id}=req.params
    try {
        await studentModel.deleteStudent_model(id)
        res.status(200).json({message: "Student eliminated"})
    } catch (error) {
        res.status(500).json(error)
    }
}


const getStudent_controller=async (req, res)=>{
    const {id}=req.params
    try {
        const student=await studentModel.getStudent_ID(id)
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json(error)
    }
}


/*const getStudentID_controller = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await studentModel.getStudentID_model(id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Respuesta exitosa
        res.status(200).json(student);
    } catch (error) {
        // Manejar errores inesperados
        console.error('Error fetching student by ID:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};*/





export {
    registerStudent_controller,
    loginStudent_controller,
    updateStudent_controller,
    //getStudentID_controller,
    deleteStudent_controller,
    getStudent_controller
}