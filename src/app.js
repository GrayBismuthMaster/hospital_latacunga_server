
//Depuración
// import debug from 'debug'('app:inicio');
//Debug de DB
import express from 'express'
//import config from './config'
const app = express();
//Cookie 
import cookieParser from 'cookie-parser';
//Middleware cookieParser
app.use(cookieParser())
// import logger from './logger'
import morgan from 'morgan'
//Cors
import cors from 'cors'
//Middleware de express para manejar post
app.use(express.json());//Recibe peticiones del body en formato json
//Y envia a la ruta body var1 = valor&var2=valor
//Rutas ROLES

//IMPORTANTE GENERAR ROLES 
// import {createRoles} from './libs/initialSetup'
// createRoles();



//Utilizar las rutas
import usuarios from './routes/usuarios.routes.js';
import auth from './routes/auth.routes.js';
import profesionales from './routes/profesionales.routes.js'
import especialidades from './routes/especialidades.routes.js';
import consultorios from './routes/consultorios.routes.js'
import historiasClinicas from './routes/historiasClinicas.routes.js';
import evolucionesPrescripciones from './routes/evolucionesPrescripciones.routes.js';
import detallesEvolucionesPrescripciones from './routes/detallesEvolucionesPrescripciones.routes.js';
import reservasCitas from './routes/reservasCitas.routes.js';
import uploads from './routes/uploads.routes.js'
// import historiasClinicas from './routes/historiasClinicas.routes';
// import solicitudesExamenes from './routes/solicitudesExamenes.routes';
// import protocolosOperatorios from './routes/protocolosOperatorios.routes';
// import epicrisises from './routes/epicrisises.routes'
// import consentimientos from './routes/consentimientos.routes'
// import profile from './routes/profile.routes' ;
// import tratamientos from './routes/tratamientos.routes'
// import reservasCitas from './routes/reservasCitas.routes'
// import especialidades from './routes/especialidades.routes'
// import pdf from './routes/pdf.routes'
//Url encoded permite trabajar con query strings 
//Permite el envío por formularios
app.use(express.urlencoded({extended:true}));

//recursos static
// app.use('/public',express.static(`${__dirname}/public`));


//Middleware para el login
//app.use(logger);

//Config de entornos 
//console.log('Aplication: '+config.get('nombre'));
//console.log('BD server: '+config.get('configDB.host'));


//Morgan es un middleware de terceros para el registro de las peticiones http
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    //console.log('morgan habilitado');
    
    // debug('Morgan está habilitado');
    app.use(cors({origin:'*', credentials:true}));
}
if(app.get('env')==='production'){
    //app.use(cors({origin:'http://dermatologiaBettyGarzon:3000', credentials:true}))
    app.use(cors({origin:'*'}))
}
//Trabajos con la base de datos
// debug('Conectando con la base de datos');

//Middleware cuando uso la api de usuarios

app.use('/api/usuarios',usuarios);
app.use('/api/auth',auth);
app.use('/api/consultorios',consultorios);
app.use('/api/especialidades', especialidades);
app.use('/api/profesionales',profesionales);
app.use('/api/historiasClinicas', historiasClinicas);
app.use('/api/evolucionesPrescripciones', evolucionesPrescripciones);
app.use('/api/detallesEvolucionesPrescripciones', detallesEvolucionesPrescripciones);
app.use('/api/reservasCitas',reservasCitas);

app.use('/api/uploads', uploads)
//OLD

// app.use('/api/historiasClinicas',historiasClinicas);
// app.use('/api/solicitudesExamenes',solicitudesExamenes);
// app.use('/api/protocolosOperatorios', protocolosOperatorios);
// app.use('/api/epicrisises', epicrisises);
// app.use('/api/consentimientos', consentimientos);
// app.use('/api/profile', profile );
// app.use('/api/tratamientos',tratamientos);
// app.use('/api/pdf' ,pdf )
//Nuevo para recuperar app
export default app;