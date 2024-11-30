import bcrypt from 'bcrypt';
const studentModel={
    async registerStudent_model(newStudent){
        const url="http://localhost:4000/students"
        const peticion=await fetch(url, {
            method: "POST",
            body: JSON.stringify(newStudent),
            headers: {'Content-Type': "application/json"}
        })
        const data=await peticion.json()
        return data
    },
    async loginStudent_model(mail, password){
        const url="http://localhost:4000/students"
        const peticion=await fetch(url)
        const students=await peticion.json()
        const student=students.find(student=>student.mail===mail)
        if (!student){
            return {error:"Mail or password wrong, try again"}
        }
        const passwordMatch=await bcrypt.compare(password, student.password)
        if (student && passwordMatch){
            return student
        } else {
            return {error: "Mail or password wrong, try again"}
        }
    }
}
export default studentModel