import Sequelize, { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';

export const EvolucionPrescripcion = sequelize.define('evoluciones_prescripcion',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    num_hoja : {
        type : DataTypes.INTEGER
    },
});