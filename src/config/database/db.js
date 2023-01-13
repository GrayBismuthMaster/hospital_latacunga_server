//Pruebas DB
import Sequelize from 'sequelize';


// require('dotenv').config({path: 'variables.env'})
export const sequelize = new Sequelize('hospital_latacunga', 'postgres', 'postgres',{
    host: 'localhost',
    port : '5433',
    dialect : 'postgres',
    
});
