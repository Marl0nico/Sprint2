import express from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import routerStudent from './routers/students_routes.js'
const app=express()
/*dotenv.config()
console.log(process.env.cloudinary_cloud_name);
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
})
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));*/
//variables
app.set('port', process.env.puerto || 3000)
//middlewares
app.use(express.json())
//rutas
app.get('/', (req, res)=>{
    res.send("Server on")
})
//rutas - estudiantes
app.use('/api', routerStudent)
//exportación de la variable app
export default app
