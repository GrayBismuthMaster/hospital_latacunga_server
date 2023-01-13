
//const http = require('http')
import app from './app.js'
import {dbInit} from './config/database/dbInit.js';

import dotenv from 'dotenv';
dotenv.config({path : 'variables.env'})

if(process.env.NODE_ENV !== 'production'){
    
    console.log('Esta en desarrollo');
    try{
        const initStatus = await dbInit();
        console.log("Estado de la base ",initStatus);
    }catch(e){
        console.log(e);
    }
}
else{
    // console.log("production");
    // const mongoEnvPro = process.env.DB_MONGO_PRO;
    // dbConexion(mongoEnvPro) 
    // db();
    // const server = http.createServer(app);
    // app.listen({port:process.env.PROD_PORT||5001},()=>{
    //     console.log(`Servidor Levantado en el puerto ${process.env.PROD_PORT}`);
    // }); 
}

