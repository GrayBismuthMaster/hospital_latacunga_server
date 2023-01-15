import {EvolucionPrescripcion} from '../models/EvolucionPrescripcion.js'
import dotenv from 'dotenv';
import { DetalleEvolucionPrescripcion } from '../models/DetalleEvolucionPrescripcion.js';
dotenv.config({path : 'variables.env'})

export const createEvolucionPrescripcion = async (req, res) =>{
        let 
        {
            num_hoja,
            historia_clinica_id,
            id_usuario_evolucion_prescripcion,
            id_consultorio_evolucion_prescripcion
        } = req.body;
        try {
            const savedEvolucionPrescripcion = await EvolucionPrescripcion.create({
                num_hoja,
                historia_clinica_id,
                id_usuario_evolucion_prescripcion,
                id_consultorio_evolucion_prescripcion
            });
           res.status(202)
           .send({
                message:"Creación completa",
                datosEvolucionPrescripcionCreado : savedEvolucionPrescripcion,
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getEvolucionesPrescripciones = (req, res) =>{
      //res.send("Welcome to evolucionPrescripcion ");
      let evolucionesPrescripciones = obtenerEvolucionesPrescripciones();
      evolucionesPrescripciones.then((accesoEvolucionesPrescripciones)=>{
          res.json(accesoEvolucionesPrescripciones)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getDetallesEvolucionesPrescripciones = (req, res) =>{
    //res.send("Welcome to evolucionPrescripcion ");
    const {id} = req.params;
    let detallesEvolucionesPrescripciones = obtenerDetallesEvolucionesPrescripciones(id);
    detallesEvolucionesPrescripciones.then((accesoDetallesEvolucionesPrescripciones)=>{
        res.json(accesoDetallesEvolucionesPrescripciones)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getEvolucionPrescripcionById = async (req, res) =>{
    try {
        const {id} = req.params;
        const evolucionPrescripcion = await EvolucionPrescripcion.findOne({
            where : {
                id
            }
        });
        res.status(200).json(evolucionPrescripcion);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const updateEvolucionPrescripcionById = async (req, res) =>{
        
    try {
        //Para obtener datos actualizados el tercer param
        const {id} = req.params;
        const {
            num_hoja
        } = req.body;

        const evolucionPrescripcionActualizado = await EvolucionPrescripcion.findOne({
            where : {
                id
            }
        });

        evolucionPrescripcionActualizado.num_hoja  = num_hoja ? num_hoja : evolucionPrescripcionActualizado.num_hoja
      
        await evolucionPrescripcionActualizado.save();
        res.status(200).json(evolucionPrescripcionActualizado);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
        
}
export const deleteEvolucionPrescripcionById = async (req, res)=>{
    try {
        const {id} = req.params;
        await EvolucionPrescripcion.destroy({
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

const obtenerEvolucionesPrescripciones =async  ()=>{
    const evolucionesPrescripciones = await EvolucionPrescripcion.findAll();
    return evolucionesPrescripciones;
}


const obtenerDetallesEvolucionesPrescripciones =async  (id)=>{
    const detallesEvolucionPrescripcion = await DetalleEvolucionPrescripcion.findAll({
        include: [ 
            { 
                model: EvolucionPrescripcion, 
                as: 'evolucion_prescripcion' 
            }   
        ], 
        where : {
            id_evolucion_prescripcion : id
        }
    });
    return detallesEvolucionPrescripcion;
}
