import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';
export const Consultorio = sequelize.define('consultorios',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    nombre_consultorio : {
        type : DataTypes.TEXT
    },
    descripcion_consultorio : {
        type : DataTypes.TEXT
    },
    imagen_consultorio : {
        type : DataTypes.TEXT
    },
    direccion_consultorio  : {
        type : DataTypes.TEXT
    },
    horario_atencion_consultorio : {
        type : DataTypes.TEXT
    },
    estado_consultorio : {
        type : DataTypes.BOOLEAN
    }
},{
    freezeTableName: true
});