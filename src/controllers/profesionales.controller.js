import {Profesional} from '../models/Profesional.js'
import {Rol} from '../models/Rol.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Especialidad } from '../models/Especialidad.js';
dotenv.config({path : 'variables.env'})

export const createProfesional = async (req, res) =>{
        let 
        {
            nombre_profesional,
            apellido_profesional,
            cedula_profesional,
            telefono_profesional,
            direccion_profesional,
            correo_profesional,
            imagen_profesional,
            estado_profesional,
            especialidad_id
        } = req.body;
        try {
            const savedProfesional = await Profesional.create({
                nombre_profesional,
                apellido_profesional,
                cedula_profesional,
                telefono_profesional,
                direccion_profesional,
                correo_profesional,
                imagen_profesional,
                estado_profesional,
                especialidad_id
            });

           res.status(202)
           .send({
                message:"Creación completa",
                datosProfesionalCreado : await obtenerProfesionalPorId(savedProfesional.id),
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getProfesionales = (req, res) =>{
      //res.send("Welcome to profesional ");
      let profesionales = obtenerProfesionales();
      profesionales.then((accesoProfesionales)=>{
          res.json(accesoProfesionales)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getProfesionalById = async (req, res) =>{
    try {
        const {id} = req.params;
        const profesional = await Profesional.findOne({
            where : {
                id
            }
        });
        res.status(200).json(profesional);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const updateProfesionalById = async (req, res) =>{
        
    try {
        //Para obtener datos actualizados el tercer param
        const {id} = req.params;
        const {
            nombre_profesional,
            apellido_profesional,
            cedula_profesional,
            telefono_profesional,
            direccion_profesional,
            correo_profesional,
            imagen_profesional,
            estado_profesional
        } = req.body;

        const profesionalActualizado = await Profesional.findOne({
            where : {
                id
            }
        });

        profesionalActualizado.nombre_profesional  = nombre_profesional ? nombre_profesional : profesionalActualizado.nombre_profesional
        profesionalActualizado.apellido_profesional  = apellido_profesional ? apellido_profesional : profesionalActualizado.apellido_profesional
        profesionalActualizado.cedula_profesional  = cedula_profesional ? cedula_profesional : profesionalActualizado.cedula_profesional
        profesionalActualizado.telefono_profesional  = telefono_profesional ? telefono_profesional : profesionalActualizado.telefono_profesional;
        profesionalActualizado.direccion_profesional  = direccion_profesional ? direccion_profesional : profesionalActualizado.direccion_profesional
        profesionalActualizado.correo_profesional  = correo_profesional ? correo_profesional : profesionalActualizado.correo_profesional;
        profesionalActualizado.imagen_profesional  = imagen_profesional ? imagen_profesional : profesionalActualizado.imagen_profesional;
        profesionalActualizado.estado_profesional  = estado_profesional ? estado_profesional : profesionalActualizado.estado_profesional;
        

        await profesionalActualizado.save();
        res.status(200).json(profesionalActualizado);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
        
}
export const deleteProfesionalById = async (req, res)=>{
    try {
        const {id} = req.params;
        await Profesional.destroy({
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

const obtenerProfesionales =async  ()=>{
    const profesionales = await Profesional.findAll();
    return profesionales;
}

const obtenerProfesionalPorId = async(id)=>{
    try {
        const profesional = await Profesional.findOne({
            include: [ 
                { 
                    model: Especialidad, 
                    as: 'especialidad' 
                }   
            ], 
            where : {
                id
            }
        });
        return profesional;
    } catch (error) {
        return error;
    }
}