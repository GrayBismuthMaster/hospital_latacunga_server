import {Consultorio} from '../models/Consultorio.js'
import dotenv from 'dotenv';
import { Especialidad } from '../models/Especialidad.js';
dotenv.config({path : 'variables.env'})

export const createConsultorio = async (req, res) =>{
        let 
        {
            nombre_consultorio,
            descripcion_consultorio,
            direccion_consultorio,
            imagen_consultorio,
            horario_atencion_consultorio,
            estado_consultorio,
        } = req.body;
        try {
            const savedConsultorio = await Consultorio.create({
                nombre_consultorio,
                descripcion_consultorio,
                direccion_consultorio,
                imagen_consultorio,
                horario_atencion_consultorio,
                estado_consultorio,
            });
           res.status(202)
           .send({
                message:"Creación completa",
                datosConsultorioCreado : savedConsultorio,
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getConsultorios = (req, res) =>{
      //res.send("Welcome to consultorio ");
      let consultorios = obtenerConsultorios();
      consultorios.then((accesoConsultorios)=>{
          res.json(accesoConsultorios)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getEspecialidadesConsultorio = (req, res) =>{
    //res.send("Welcome to consultorio ");
    const {id} = req.params;
    let especialidadesConsultorio = obtenerEspecialidadesConsultorio(id);
    especialidadesConsultorio.then((accesoEspecialidadesConsultorio)=>{
        res.json(accesoEspecialidadesConsultorio)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getConsultorioById = async (req, res) =>{
    try {
        const {id} = req.params;
        const consultorio = await Consultorio.findOne({
            where : {
                id
            }
        });
        res.status(200).json(consultorio);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const updateConsultorioById = async (req, res) =>{
        
    try {
        //Para obtener datos actualizados el tercer param
        const {id} = req.params;
        const {
            nombre_consultorio,
            descripcion_consultorio,
            direccion_consultorio,
            imagen_consultorio,
            horario_atencion_consultorio,
            estado_consultorio,
        } = req.body;

        const consultorioActualizado = await Consultorio.findOne({
            where : {
                id
            }
        });

        consultorioActualizado.nombre_consultorio  = nombre_consultorio ? nombre_consultorio : consultorioActualizado.nombre_consultorio
        consultorioActualizado.descripcion_consultorio  = descripcion_consultorio ? descripcion_consultorio : consultorioActualizado.descripcion_consultorio
        consultorioActualizado.imagen_consultorio  = imagen_consultorio ? imagen_consultorio : consultorioActualizado.imagen_consultorio
        consultorioActualizado.estado_consultorio  = estado_consultorio ? estado_consultorio : consultorioActualizado.estado_consultorio;
        consultorioActualizado.direccion_consultorio  = direccion_consultorio ? direccion_consultorio : consultorioActualizado.direccion_consultorio
        consultorioActualizado.horario_atencion_consultorio  = horario_atencion_consultorio ? horario_atencion_consultorio : consultorioActualizado.horario_atencion_consultorio;
        
        await consultorioActualizado.save();
        res.status(200).json(consultorioActualizado);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
        
}
export const deleteConsultorioById = async (req, res)=>{
    try {
        const {id} = req.params;
        await Consultorio.destroy({
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

const obtenerConsultorios =async  ()=>{
    const consultorios = await Consultorio.findAll();
    return consultorios;
}


const obtenerEspecialidadesConsultorio =async  (id)=>{
    const especialidadesConsultorio = await Especialidad.findAll({
        include: [ 
            { 
                model: Consultorio, 
                as: 'consultorio' 
            }   
        ], 
        where : {
            consultorio_id : id
        }
    });
    return especialidadesConsultorio;
}
