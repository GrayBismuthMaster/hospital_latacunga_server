import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';
export const Profesional = sequelize.define('profesionales',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    nombre_profesional : {
        type : DataTypes.TEXT
    },
    apellido_profesional : {
        type : DataTypes.TEXT
    },
    cedula_profesional : {
        type : DataTypes.TEXT
    },
    telefono_profesional : {
        type : DataTypes.TEXT
    },
    direccion_profesional : {
        type : DataTypes.TEXT
    },
    correo_profesional : {
        type : DataTypes.TEXT
    },
    imagen_profesional : {
        type : DataTypes.TEXT
    },
    estado_profesional : {
        type : DataTypes.BOOLEAN
    }
    //TODO RELACIONES ID_profesional 
    
},{
    freezeTableName: true
    });
