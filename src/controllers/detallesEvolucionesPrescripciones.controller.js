import {DetalleEvolucionPrescripcion} from '../models/DetalleEvolucionPrescripcion.js'
import dotenv from 'dotenv';
import { EvolucionPrescripcion } from '../models/EvolucionPrescripcion.js';
dotenv.config({path : 'variables.env'})

export const createDetalleEvolucionPrescripcion = async (req, res) =>{
        let 
        {
            evolucion,
            prescripciones,
            medicamentos,
            id_evolucion_prescripcion
        } = req.body;
        try {
            const savedDetalleEvolucionPrescripcion = await DetalleEvolucionPrescripcion.create({
                evolucion,
                prescripciones,
                medicamentos,
                id_evolucion_prescripcion
            });
           res.status(202)
           .send({
                message:"Creación completa",
                datosDetalleEvolucionPrescripcionCreado : await obtenerDetalleEvolucionPrescripcionById(savedDetalleEvolucionPrescripcion.id),
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getDetallesEvolucionesPrescripciones = (req, res) =>{
      //res.send("Welcome to evolucionPrescripcion ");
      let detallesEvolucionesPrescripciones = obtenerDetallesEvolucionesPrescripciones();
      detallesEvolucionesPrescripciones.then((accesoDetallesEvolucionesPrescripciones)=>{
          res.json(accesoDetallesEvolucionesPrescripciones)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getDetalleEvolucionPrescripcionById = async (req, res) =>{
    try {
        const {id} = req.params;
        const detalleEvolucionPrescripcion = await DetalleEvolucionPrescripcion.findOne({
            where : {
                id
            }
        });
        res.status(200).json(detalleEvolucionPrescripcion);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const updateDetalleEvolucionPrescripcionById = async (req, res) =>{
        
    try {
        //Para obtener datos actualizados el tercer param
        const {id} = req.params;
        const {
            evolucion,
            prescripciones,
            medicamentos,
        } = req.body;

        const detalleEvolucionPrescripcionActualizado = await DetalleEvolucionPrescripcion.findOne({
            where : {
                id
            }
        });

        detalleEvolucionPrescripcionActualizado.evolucion  = evolucion ? evolucion : detalleEvolucionPrescripcionActualizado.evolucion
        detalleEvolucionPrescripcionActualizado.prescripciones =prescripciones ? prescripciones : detalleEvolucionPrescripcionActualizado.prescripciones ,
        detalleEvolucionPrescripcionActualizado.medicamentos =medicamentos ? medicamentos : detalleEvolucionPrescripcionActualizado.medicamentos ,
       
        await detalleEvolucionPrescripcionActualizado.save();
        res.status(200).json(detalleEvolucionPrescripcionActualizado);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
        
}
export const deleteDetalleEvolucionPrescripcionById = async (req, res)=>{
    try {
        const {id} = req.params;
        await DetalleEvolucionPrescripcion.destroy({
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

const obtenerDetallesEvolucionesPrescripciones =async  ()=>{
    const detallesEvolucionesPrescripciones = await DetalleEvolucionPrescripcion.findAll();
    return detallesEvolucionesPrescripciones;
}


const obtenerDetalleEvolucionPrescripcionById =async  (id)=>{
    try {
        const detalleEvolucionPrescripcion = await DetalleEvolucionPrescripcion.findOne({
            include: [ 
                { 
                    model: EvolucionPrescripcion, 
                    as: 'evolucion_prescripcion' 
                }   
            ], 
            where : {
                id
            }
        });
        return detalleEvolucionPrescripcion
    } catch (error) {
        return error;
    }
}
