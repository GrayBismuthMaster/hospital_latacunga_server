import {Especialidad} from '../models/Especialidad.js'
import {Consultorio} from '../models/Consultorio.js'
import {Profesional} from '../models/Profesional.js'
import dotenv from 'dotenv';
import { HistoriaClinica } from '../models/HistoriaClinica.js';
import { Usuario } from '../models/Usuario.js';
dotenv.config({path : 'variables.env'})

export const createEspecialidad = async (req, res) =>{
        let 
        {
            nombre_especialidad,
            estado_especialidad,
            consultorio_id
        } = req.body;
        try {
            const savedEspecialidad = await Especialidad.create({
                nombre_especialidad,
                estado_especialidad,
                consultorio_id
            });

           res.status(202)
           .send({
                message:"Creación completa",
                datosEspecialidadCreado : await obtenerEspecialidadPorId(savedEspecialidad.id),
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getEspecialidades = (req, res) =>{
      //res.send("Welcome to especialidad ");
      let especialidades = obtenerEspecialidades();
      especialidades.then((accesoEspecialidades)=>{
          res.json(accesoEspecialidades)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getProfesionalesEspecialidad = (req, res) =>{
    //res.send("Welcome to especialidad ");
    const {id} = req.params;
    let profesionalesEspecialidad = obtenerProfesionalesEspecialidad(id);
    profesionalesEspecialidad.then((accesoProfesionales)=>{
        res.json(accesoProfesionales)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getHistoriasClinicasEspecialidad = (req, res) =>{
    //res.send("Welcome to especialidad ");
    const {id} = req.params;
    let historiasClinicasEspecialidad = obtenerHistoriasClinicasEspecialidad(id);
    historiasClinicasEspecialidad.then((accesoHistoriasClinicas)=>{
        res.json(accesoHistoriasClinicas)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getEspecialidadById = async (req, res) =>{
    try {
        const {id} = req.params;
        const especialidad = await obtenerEspecialidadPorId(id);
        res.status(200).json(especialidad);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const updateEspecialidadById = async (req, res) =>{
        
    try {
        //Para obtener datos actualizados el tercer param
        const {id} = req.params;
        const {
            nombre_especialidad,
            estado_especialidad,
        } = req.body;

        const especialidadActualizado = await Especialidad.findOne({
            include: [ 
                { 
                    model: Consultorio, 
                    as: 'consultorio' 
                }   
            ], 
            where : {
                id
            }
        });

        especialidadActualizado.nombre_especialidad  = nombre_especialidad ? nombre_especialidad : especialidadActualizado.nombre_especialidad
        especialidadActualizado.estado_especialidad  = estado_especialidad ? estado_especialidad : especialidadActualizado.estado_especialidad;
        await especialidadActualizado.save();
        res.status(200).json(especialidadActualizado);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
        
}
export const deleteEspecialidadById = async (req, res)=>{
    try {
        const {id} = req.params;
        await Especialidad.destroy({
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

const obtenerEspecialidades =async  ()=>{
    const especialidades = await Especialidad.findAll({
        include: [ 
            { 
                model: Consultorio, 
                as: 'consultorio' 
            }   
        ], 
    }  
    );
    return especialidades;
}
const obtenerEspecialidadPorId = async (id)=>{
    const especialidad = await Especialidad.findOne({
        include: [ 
            { 
                model: Consultorio, 
                as: 'consultorio' 
            }   
        ], 
        where : {
            id
        }
    });
    return especialidad;
}
const obtenerProfesionalesEspecialidad =async  (id)=>{
    const profesionalesEspecialidad = await Profesional.findAll({
        where : {
            especialidad_id : id
        },
        include: [ 
            { 
                model: Especialidad, 
                as: 'especialidad' 
            }   
        ], 
    });
    return profesionalesEspecialidad;
}
const obtenerHistoriasClinicasEspecialidad = async(id)=>{
    const historiasClinicasEspecialidad = await HistoriaClinica.findAll({
        where : {
            id_especialidad_historia_clinica : id
        },
        include: [ 
            { 
                model: Especialidad, 
                as: 'especialidad_historia_clinica' 
            },
            { 
                model: Usuario, 
                as: 'usuario_historia_clinica' 
            },
            { 
                model: Profesional, 
                as: 'profesional_historia_clinica' 
            },
        ], 
    });
    return historiasClinicasEspecialidad;
}