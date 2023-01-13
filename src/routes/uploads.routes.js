import {Router} from 'express'
const router= Router();
import {authJwt, verifySignup} from '../middlewares'
//PARA MANEJAR MULTIFORM PART DATA
import upload from '../libs/storage.js';
import * as uploadsController from '../controllers/uploads.controller.js'
//Al tener la raiz ya con la ruta solo manejo la raiz
//Petición Get que obtiene todos los usuarios
router.post('/profile', upload.single('avatar'), uploadsController.uploadProfile )
router.post('/signS3', uploadsController.signS3 )
//Petición get para el error 404
router.get('*',(req,res)=>{
    res
    .status(404)
    .send(`<h1>No existe la pagina :c</h1>`);
})

export default router
