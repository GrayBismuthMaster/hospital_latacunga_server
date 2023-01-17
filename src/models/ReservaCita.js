import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';

export const ReservaCita = sequelize.define('reservas_cita',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    motivo_reserva : {
        type : DataTypes.TEXT
    },
    fecha_hora_inicio_reserva  : {
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
                const enums = ['ACEPTADO','PENDIENTE','CANCELADO']
                if (!enums.includes(value)) {
                    throw new Error('not a valid option')
                }
            }
        }
    }
    //TODO RELACIONES PROFESIONAL, ESPECIALIDAD, CONSULTORIO
    
});