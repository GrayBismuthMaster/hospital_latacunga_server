import dotenv from 'dotenv';
import { Especialidad } from '../models/Especialidad.js';
import { Usuario } from '../models/Usuario.js';
import { Profesional } from '../models/Profesional.js';
import { EvolucionPrescripcion } from '../models/EvolucionPrescripcion.js';
import { Consultorio } from '../models/Consultorio.js';
import {ReservaCita} from '../models/ReservaCita.js'
dotenv.config({path : 'variables.env'})

export const createReservaCita = async (req, res) =>{
        let 
        {
            motivo_reserva,
            fecha_hora_inicio_reserva,
            fecha_hora_fin_reserva,
            estado_reserva,
            id_usuario_reserva_cita,
            id_especialidad_reserva_cita,
            id_profesional_reserva_cita,
            id_consultorio_reserva_cita
        } = req.body;

        try {
            const savedReservaCita = await ReservaCita.create({
                motivo_reserva,
                fecha_hora_inicio_reserva,
                fecha_hora_fin_reserva,
                estado_reserva,
                id_usuario_reserva_cita,
                id_especialidad_reserva_cita,
                id_profesional_reserva_cita,
                id_consultorio_reserva_cita
            });
           res.status(202)
           .send({
                message:"Creación completa",
                datosReservaCitaCreado : savedReservaCita,
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getReservasCitas = (req, res) =>{
      //res.send("Welcome to reservaCita ");
      let reservasCitas = obtenerReservasCitas();
      reservasCitas.then((accesoReservasCitas)=>{
          res.json(accesoReservasCitas)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getReservasCitasByUserId = async (req, res) =>{
    try {
        const {id} = req.params;
        const reservasByUserId = await obtenerReservasCitasByUserId(id);
        res.status(200).json(reservasByUserId);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const getReservaCitaById = async (req, res) =>{
    try {
        const {id} = req.params;
        const reservaCita = await ReservaCita.findOne({
            where : {
                id
            }
        });
        res.status(200).json(reservaCita);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}

export const updateReservaCitaById = async (req, res) =>{
        
    try {
        //Para obtener datos actualizados el tercer param
        const {id} = req.params;
        const {
           
            motivo_reserva,
            fecha_hora_inicio,
            fecha_hora_fin_reserva,
            estado_reserva,
            id_usuario_reserva_cita,
            id_especialidad_reserva_cita,
            id_profesional_reserva_cita,
            id_consultorio_reserva_cita
        } = req.body;

        const reservaCitaActualizado = await ReservaCita.findOne({
            where : {
                id
            }
        });

        reservaCitaActualizado.motivo_reserva = motivo_reserva ? motivo_reserva : reservaCitaActualizado.motivo_reserva;
        reservaCitaActualizado.fecha_hora_inicio = fecha_hora_inicio ? fecha_hora_inicio : reservaCitaActualizado.fecha_hora_inicio;
        reservaCitaActualizado.fecha_hora_fin_reserva = fecha_hora_fin_reserva ? fecha_hora_fin_reserva : reservaCitaActualizado.fecha_hora_fin_reserva;
        reservaCitaActualizado.estado_reserva = estado_reserva ? estado_reserva : reservaCitaActualizado.estado_reserva;
        reservaCitaActualizado.id_usuario_reserva_cita = id_usuario_reserva_cita ? id_usuario_reserva_cita : reservaCitaActualizado.id_usuario_reserva_cita;
        reservaCitaActualizado.id_especialidad_reserva_cita = id_especialidad_reserva_cita ? id_especialidad_reserva_cita : reservaCitaActualizado.id_especialidad_reserva_cita;
        reservaCitaActualizado.id_profesional_reserva_cita = id_profesional_reserva_cita ? id_profesional_reserva_cita : reservaCitaActualizado.id_profesional_reserva_cita;
        reservaCitaActualizado.id_consultorio_reserva_cita = id_consultorio_reserva_cita ? id_consultorio_reserva_cita : reservaCitaActualizado.id_consultorio_reserva_cita;
        
        await reservaCitaActualizado.save();
        res.status(200).json(reservaCitaActualizado);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
        
}
export const deleteReservaCitaById = async (req, res)=>{
    try {
        const {id} = req.params;
        await ReservaCita.destroy({
            where:{
                id
            }
        });
        res.status(204).send()
    } catch (error) {
        res.status(500).json({"error": "algo ha salido mal :c", "descripcion" : error})
    }
        
}

//FUNCIONES DE LOS CONTROLLERS-------------------------------------------------------------------------------------------------------------

const obtenerReservasCitas =async  ()=>{
    const reservasCitas = await ReservaCita.findAll({
        include: [ 
            { 
                model: Especialidad, 
                as: 'especialidad_reserva_cita' 
            },
            { 
                model: Usuario, 
                as: 'usuario_reserva_cita' 
            },
            { 
                model: Profesional, 
                as: 'profesional_reserva_cita' 
            },
            { 
                model: Consultorio, 
                as: 'consultorio_reserva_cita' 
            },
        ], 
    });
    return reservasCitas;
}
const obtenerReservasCitasByUserId =async  (id)=>{
    const reservasCitasByUserId = await ReservaCita.findAll({
        include: [ 
            { 
                model: Especialidad, 
                as: 'especialidad_reserva_cita' 
            },
            { 
                model: Usuario, 
                as: 'usuario_reserva_cita' 
            },
            { 
                model: Profesional, 
                as: 'profesional_reserva_cita' 
            },
            { 
                model: Consultorio, 
                as: 'consultorio_reserva_cita' 
            },
        ], 
        where : {
            id_usuario_reserva_cita : id
        }
    });
    return reservasCitasByUserId;
}


