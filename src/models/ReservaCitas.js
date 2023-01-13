import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';

export const ReservaCitas = sequelize.define('reservas_cita',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    motivo_reserva : {
        type : DataTypes.TEXT
    },
    fecha_hora_inicio  : {
        type : DataTypes.DATE
    },
    fecha_hora_fin_reserva : {
        type : DataTypes.DATE
    },
    estado_reserva : {
        type : DataTypes.TEXT,
        defaultValue: 'PENDIENTE',
        validate: {
            customValidator: (value) => {
                const enums = ['COMPLETADO','PENDIENTE','CANCELADO']
                if (!enums.includes(value)) {
                    throw new Error('not a valid option')
                }
            }
        }
    }
    //TODO RELACIONES PROFESIONAL, ESPECIALIDAD, CONSULTORIO
    
});
//     motivo_reserva                  :       {
//         type: String,
//         required:true    
//     },

// fecha_hora_inicio_reserva       :       {
//         type: Date,
//         required: true
//     },

// fecha_hora_fin_reserva          :       {
//         type: Date,
//         required: true
//     },
// estado_reserva                  :       {
//         type: String,
//         required: true
//     },                                      
// id_usuario                      :       {
//         ref: 'Usuario',
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
// id_profesional                  :       {
//         ref: 'Profesional',
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
// id_especialidad                 :       {
//         ref: 'Especialidad',
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
// id_consultorio                  :       {
//         ref: 'Consultorio',
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },