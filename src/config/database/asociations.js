import { Consultorio } from "../../models/Consultorio.js";

import {EvolucionPrescripcion} from '../../models/EvolucionPrescripcion.js';
import {HistoriaClinica} from '../../models/HistoriaClinica.js';
import {DetalleEvolucionPrescripcion} from '../../models/DetalleEvolucionPrescripcion.js';
import { Especialidad } from "../../models/Especialidad.js";
import { Profesional } from "../../models/Profesional.js";
import {ReservaCitas} from '../../models/ReservaCitas.js'
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
            foreignKey : 'historia_clinica_id',
            targetId : 'id'
        })
        EvolucionPrescripcion.belongsTo(HistoriaClinica,{
            foreignKey : 'historia_clinica_id',
            sourceKey : 'id'
        })
    // EVOLUCION PRESCRIPCION TIENE VARIOS DETALLES EVOLUCION PRESCRIPCION
        EvolucionPrescripcion.hasMany(DetalleEvolucionPrescripcion, {
            foreignKey : 'id_evolucion_prescripcion',
            targetId : 'id'
        })
        DetalleEvolucionPrescripcion.belongsTo(EvolucionPrescripcion, {
            foreignKey : 'id_evolucion_prescripcion',
            sourceKey : 'id'
        })
    //RESERVA DE CITAS ESPECIALIDAD, MEDICO, CONSULTORIO FECHA, HORA
        Especialidad.hasOne(ReservaCitas, {
            foreignKey : 'id_especialidad',
            targetId : 'id'
        })
        ReservaCitas.belongsTo(Especialidad, {
            foreignKey : 'id_especialidad',
            sourceId : 'id'
        })
        Profesional.hasOne(ReservaCitas, {
            foreignKey : 'id_profesional',
            targetId : 'id'
        })
        ReservaCitas.belongsTo(Profesional, {
            foreignKey : 'id_profesional',
            sourceId : 'id'
        })
        Consultorio.hasOne(ReservaCitas, {
            foreignKey : 'id_consultorio',
            targetId : 'id'
        })
        ReservaCitas.belongsTo(Consultorio,{
            foreignKey : 'id_consultorio',
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
            foreignKey : 'id_usuario_historia_clinica',
            targetId : 'id'
        })
        HistoriaClinica.belongsTo(Usuario,{
            foreignKey : 'id_usuario_historia_clinica',
            sourceId: 'id'
        })
    //UN PROFESIONAL TIENE VARIAS HISTORIAS CLINICAS
        Profesional.hasMany(HistoriaClinica, {
            foreignKey : 'id_profesional_historia_clinica',
            targetId : 'id'
        });
        HistoriaClinica.belongsTo(Profesional,{
            foreignKey : 'id_profesional_historia_clinica',
            sourceId : 'id'
        })