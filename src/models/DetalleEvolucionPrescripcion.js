import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';

export const DetalleEvolucionPrescripcion = sequelize.define('detalles_evolucion_prescripcion',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    evolucion : {
        type : DataTypes.TEXT
    },
    prescripciones : {
        type : DataTypes.TEXT
    },
    medicamentos : {
        type : DataTypes.TEXT
    }
});