import Sequelize, { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';

export const EvolucionPrescripcion = sequelize.define('evoluciones_prescripcion',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    nombre_establecimiento : {
        type : DataTypes.TEXT,
    },
    nombre_paciente : {
        type : DataTypes.TEXT
    },
    apellido_paciente : {
        type : DataTypes.TEXT
    },
    sexo : {
        type : DataTypes.TEXT,
        defaultValue: 'M',
        validate: {
            customValidator: (value) => {
                const enums = ['M','F']
                if (!enums.includes(value)) {
                    throw new Error('not a valid option')
                }
            }
        }
    },
    num_hoja : {
        type : DataTypes.INTEGER
    },
    //AQUI VA ID HISOTIRA CLINICA

});