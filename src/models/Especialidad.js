import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';
export const Especialidad = sequelize.define('especialidades',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    nombre_especialidad : {
        type : DataTypes.TEXT
    },
    estado_especialidad : {
        type : DataTypes.BOOLEAN
    }
    
} ,{
    freezeTableName: true
    });

// Especialidad.hasMany(Profesional,{
//     foreignKey : 'especialidadId',
//     sourceKey : 'id'
// });
// Profesional.belongsTo(Especialidad,{
//     foreignKey : 'especialidadId',
//     targetId : 'id'
// })
