import { Consultorio } from "../../models/Consultorio.js";

import {EvolucionPrescripcion} from '../../models/EvolucionPrescripcion.js';
import {HistoriaClinica} from '../../models/HistoriaClinica.js';
import {DetalleEvolucionPrescripcion} from '../../models/DetalleEvolucionPrescripcion.js';
import { Especialidad } from "../../models/Especialidad.js";
import { Profesional } from "../../models/Profesional.js";
import {ReservaCita} from '../../models/ReservaCita.js'
import { Usuario } from "../../models/Usuario.js";
import {Rol} from '../../models/Rol.js'
//UNA HISTORIA CLINICA TIENE UN MEDICO, UNA ESPECIALIDAD
    //RELACION ENTRE CONSULTORIO Y ESPECIALIDAD N A M
        Consultorio.hasMany(Especialidad,{
            foreignKey : 'consultorio_id',
            sourceKey : 'id'
        })

        Especialidad.belongsTo(Consultorio,{
            foreignKey : 'consultorio_id',
            targetId : 'id'
        })
    // //RELACION ENTRE PROFESIONAL A ESPECIALIDAD DE N A M
        Especialidad.hasMany(Profesional,{
            as : 'especialidad',
            foreignKey : 'especialidad_id',
            sourceKey : 'id'
        });
        Profesional.belongsTo(Especialidad,{
            as : 'especialidad',
            foreignKey : 'especialidad_id',
            targetId : 'id'
        })
    // EVOLUCIONES DE HISTORIA CLINICA 1 evolucion tiene una historia clinica
        HistoriaClinica.hasOne(EvolucionPrescripcion, {
            as : 'historia_clinica_evolucion_prescripcion',
            foreignKey : 'historia_clinica_id',
            targetId : 'id'
        })
        EvolucionPrescripcion.belongsTo(HistoriaClinica,{
            as : 'historia_clinica_evolucion_prescripcion',
            foreignKey : 'historia_clinica_id',
            sourceKey : 'id'
        })
    // EVOLUCION PRESCRIPCION TIENE VARIOS DETALLES EVOLUCION PRESCRIPCION
        EvolucionPrescripcion.hasMany(DetalleEvolucionPrescripcion, {
            as : 'evolucion_prescripcion',
            foreignKey : 'id_evolucion_prescripcion',
            targetId : 'id'
        })
        DetalleEvolucionPrescripcion.belongsTo(EvolucionPrescripcion, {
            as : 'evolucion_prescripcion',
            foreignKey : 'id_evolucion_prescripcion',
            sourceKey : 'id'
        })
    //RESERVA DE CITAS ESPECIALIDAD, MEDICO, CONSULTORIO FECHA, HORA
        Especialidad.hasOne(ReservaCita, {
            as : 'especialidad_reserva_cita',
            foreignKey : 'id_especialidad_reserva_cita',
            targetId : 'id'
        })
        ReservaCita.belongsTo(Especialidad, {
            as : 'especialidad_reserva_cita',
            foreignKey : 'id_especialidad_reserva_cita',
            sourceId : 'id'
        })
        Profesional.hasOne(ReservaCita, {
            as : 'profesional_reserva_cita',
            foreignKey : 'id_profesional_reserva_cita',
            targetId : 'id'
        })
        ReservaCita.belongsTo(Profesional, {
            as : 'profesional_reserva_cita',
            foreignKey : 'id_profesional_reserva_cita',
            sourceId : 'id'
        })
        Consultorio.hasOne(ReservaCita, {
            as : 'consultorio_reserva_cita',
            foreignKey : 'id_consultorio_reserva_cita',
            targetId : 'id'
        })
        ReservaCita.belongsTo(Consultorio,{
            as : 'consultorio_reserva_cita',
            foreignKey : 'id_consultorio_reserva_cita',
            sourceId : 'id'
        })
        Usuario.hasMany(ReservaCita,{
            as : 'usuario_reserva_cita',
            foreignKey : 'id_usuario_reserva_cita',
            targetId : 'id'
        });
        ReservaCita.belongsTo(Usuario,{
            as : 'usuario_reserva_cita',
            foreignKey : 'id_usuario_reserva_cita',
            sourceId : 'id'
        })
    //UN USUARIO PUEDE TENER UN ROL RELACION
        Rol.hasOne(Usuario, {
            foreignKey : 'id_rol',
            targetId : 'id'
        });
        Usuario.belongsTo(Rol, {
            foreignKey : 'id_rol',
            sourceId : 'id'
        })
    //UNA HISTORIA CLINICA TIENE UNA ESPECIALIDAD
        Especialidad.hasOne(HistoriaClinica,{
            as : 'especialidad_historia_clinica',
            foreignKey : 'id_especialidad_historia_clinica',
            targetId : 'id'
        })
        HistoriaClinica.belongsTo(Especialidad, {
            as : 'especialidad_historia_clinica',
            foreignKey : 'id_especialidad_historia_clinica',
            sourceId : 'id'
        })
    //UN USUARIO TIENE VARIAS HISTORIAS CLINICAS
        Usuario.hasMany(HistoriaClinica,{
            as : 'usuario_historia_clinica',
            foreignKey : 'id_usuario_historia_clinica',
            targetId : 'id'
        })
        HistoriaClinica.belongsTo(Usuario,{
            as : 'usuario_historia_clinica',
            foreignKey : 'id_usuario_historia_clinica',
            sourceId: 'id'
        })
    //UN PROFESIONAL TIENE VARIAS HISTORIAS CLINICAS
        Profesional.hasMany(HistoriaClinica, {
            as : 'profesional_historia_clinica',
            foreignKey : 'id_profesional_historia_clinica',
            targetId : 'id'
        });
        HistoriaClinica.belongsTo(Profesional,{
            as : 'profesional_historia_clinica',
            foreignKey : 'id_profesional_historia_clinica',
            sourceId : 'id'
        })
    //EVOLUCION PRESCRIPCION ID DE USUARIO
        Usuario.hasOne(EvolucionPrescripcion, {
            as : 'usuario_evolucion_prescripcion',
            foreignKey : 'id_usuario_evolucion_prescripcion',
            targetId : 'id'
        });
        EvolucionPrescripcion.belongsTo(Usuario, {
            as : 'usuario_evolucion_prescripcion',
            foreignKey : 'id_usuario_evolucion_prescripcion',
            sourceId : 'id'
        })
    //EVOLUCION PRESCRIPCION ESTABLECIMIENTO
        Consultorio.hasOne(EvolucionPrescripcion, {
            as : 'consultorio_evolucion_prescripcion',
            foreignKey : 'id_consultorio_evolucion_prescripcion',
            targetId : 'id'
        });
        EvolucionPrescripcion.belongsTo(Consultorio, {
            as : 'consultorio_evolucion_prescripcion',
            foreignKey : 'id_consultorio_evolucion_prescripcion',
            sourceId : 'id'
        })