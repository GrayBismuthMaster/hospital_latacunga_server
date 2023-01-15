import {HistoriaClinica} from '../models/HistoriaClinica.js'
import dotenv from 'dotenv';
import { Especialidad } from '../models/Especialidad.js';
import { Usuario } from '../models/Usuario.js';
import { Profesional } from '../models/Profesional.js';
import { EvolucionPrescripcion } from '../models/EvolucionPrescripcion.js';
import { Consultorio } from '../models/Consultorio.js';
dotenv.config({path : 'variables.env'})

export const createHistoriaClinica = async (req, res) =>{
        let 
        {
            codigo,
            motivo_consulta,
            antecedentes_personales,
            antecedentes_familiares,
            enfermedad_actual,
            revision_actual_organos_sistemas,
            signos_vitales_antropometria_fecha_medicion,
            signos_vitales_antropometria_presion_arterial,
            signos_vitales_antropometria_peso,
            signos_vitales_antropometria_pulso,
            signos_vitales_antropometria_talla,
            signos_vitales_antropometria_temperatura,
            examen_fisico_regional,
            diagnostico,
            planes_tratamiento,
            firma,
            id_especialidad_historia_clinica,
            id_usuario_historia_clinica,
            id_profesional_historia_clinica
        } = req.body;

        try {
            const savedHistoriaClinica = await HistoriaClinica.create({
                codigo,
                motivo_consulta,
                antecedentes_personales,
                antecedentes_familiares,
                enfermedad_actual,
                revision_actual_organos_sistemas,
                signos_vitales_antropometria_fecha_medicion,
                signos_vitales_antropometria_presion_arterial,
                signos_vitales_antropometria_peso,
                signos_vitales_antropometria_pulso,
                signos_vitales_antropometria_talla,
                signos_vitales_antropometria_temperatura,
                examen_fisico_regional,
                diagnostico,
                planes_tratamiento,
                firma,
                id_usuario_historia_clinica,
                id_especialidad_historia_clinica,
                id_profesional_historia_clinica,
            });
           res.status(202)
           .send({
                message:"Creación completa",
                datosHistoriaClinicaCreado : savedHistoriaClinica,
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getHistoriasClinicas = (req, res) =>{
      //res.send("Welcome to historiaClinica ");
      let historiasClinicas = obtenerHistoriasClinicas();
      historiasClinicas.then((accesoHistoriasClinicas)=>{
          res.json(accesoHistoriasClinicas)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getHistoriaClinicaById = async (req, res) =>{
    try {
        const {id} = req.params;
        const historiaClinica = await HistoriaClinica.findOne({
            where : {
                id
            }
        });
        res.status(200).json(historiaClinica);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const getEvolucionesPrescripcionesHistoriaClinica = (req, res) =>{
    //res.send("Welcome to especialidad ");
    const {id} = req.params;
    let evolucionesPrescripcionesHistoriaClinica = obtenerEvolucionesPrescripcionesHistoriaClinica(id);
    evolucionesPrescripcionesHistoriaClinica.then((accesoEvolucionesPrescripcionesHistoriasClinicas)=>{
        res.json(accesoEvolucionesPrescripcionesHistoriasClinicas)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const updateHistoriaClinicaById = async (req, res) =>{
        
    try {
        //Para obtener datos actualizados el tercer param
        const {id} = req.params;
        const {
           
            codigo,
            motivo_consulta,
            antecedentes_personales,
            antecedentes_familiares,
            enfermedad_actual,
            revision_actual_organos_sistemas,
            revision_actual_organos_sistemas_sentidos,
            revision_actual_organos_sistemas_respiratorio,
            revision_actual_organos_sistemas_cardiovascular,
            revision_actual_organos_sistemas_digestivo,
            revision_actual_organos_sistemas_dental,
            revision_actual_organos_sistemas_urinario,
            revision_actual_organos_sistemas_musculo_esqueletico,
            revision_actual_organos_sistemas_endocrinico,
            revision_actual_organos_sistemas_hemo_linfaticos,
            revision_actual_organos_sistemas_nervioso,
            signos_vitales_antropometria_fecha_medicion,
            signos_vitales_antropometria_temperatura,
            signos_vitales_antropometria_presion_arterial,
            signos_vitales_antropometria_pulso,
            signos_vitales_antropometria_peso,
            signos_vitales_antropometria_talla,
            examen_fisico_regional_cabeza,
            examen_fisico_regional_cuello,
            examen_fisico_regional_torax,
            examen_fisico_regional_abdomen,
            examen_fisico_regional_pelvis,
            examen_fisico_regional_extremidades,
            diagnostico,
            planes_tratamiento,
            firma,
            id_usuario_historia_clinica,
            id_especialidad_historia_clinica,
            id_profesional_historia_clinica
        } = req.body;

        const historiaClinicaActualizado = await HistoriaClinica.findOne({
            where : {
                id
            }
        });

        historiaClinicaActualizado.id_usuario_historia_clinica = id_usuario_historia_clinica ?id_usuario_historia_clinica : historiaClinicaActualizado.id_usuario_historia_clinica,
        historiaClinicaActualizado.id_especialidad_historia_clinica = id_especialidad_historia_clinica ?id_especialidad_historia_clinica : historiaClinicaActualizado.id_especialidad_historia_clinica,
        historiaClinicaActualizado.id_profesional_historia_clinica = id_profesional_historia_clinica ?id_profesional_historia_clinica : historiaClinicaActualizado.id_profesional_historia_clinica,
        historiaClinicaActualizado.codigo= codigo ? codigo : historiaClinicaActualizado.codigo,
        historiaClinicaActualizado.motivo_consulta= motivo_consulta ? motivo_consulta : historiaClinicaActualizado.motivo_consulta,
        historiaClinicaActualizado.antecedentes_personales= antecedentes_personales ? antecedentes_personales : historiaClinicaActualizado.antecedentes_personales,
        historiaClinicaActualizado.antecedentes_familiares= antecedentes_familiares ? antecedentes_familiares : historiaClinicaActualizado.antecedentes_familiares,
        historiaClinicaActualizado.enfermedad_actual= enfermedad_actual ? enfermedad_actual : historiaClinicaActualizado.enfermedad_actual,
        historiaClinicaActualizado.revision_actual_organos_sistemas= revision_actual_organos_sistemas ? revision_actual_organos_sistemas : historiaClinicaActualizado.revision_actual_organos_sistemas,
        historiaClinicaActualizado.revision_actual_organos_sistemas_sentidos= revision_actual_organos_sistemas_sentidos ? revision_actual_organos_sistemas_sentidos : historiaClinicaActualizado.revision_actual_organos_sistemas_sentidos,
        historiaClinicaActualizado.revision_actual_organos_sistemas_respiratorio= revision_actual_organos_sistemas_respiratorio ? revision_actual_organos_sistemas_respiratorio : historiaClinicaActualizado.revision_actual_organos_sistemas_respiratorio,
        historiaClinicaActualizado.revision_actual_organos_sistemas_cardiovascular= revision_actual_organos_sistemas_cardiovascular ? revision_actual_organos_sistemas_cardiovascular : historiaClinicaActualizado.revision_actual_organos_sistemas_cardiovascular,
        historiaClinicaActualizado.revision_actual_organos_sistemas_digestivo= revision_actual_organos_sistemas_digestivo ? revision_actual_organos_sistemas_digestivo : historiaClinicaActualizado.revision_actual_organos_sistemas_digestivo,
        historiaClinicaActualizado.revision_actual_organos_sistemas_dental= revision_actual_organos_sistemas_dental ? revision_actual_organos_sistemas_dental : historiaClinicaActualizado.revision_actual_organos_sistemas_dental,
        historiaClinicaActualizado.revision_actual_organos_sistemas_urinario= revision_actual_organos_sistemas_urinario ? revision_actual_organos_sistemas_urinario : historiaClinicaActualizado.revision_actual_organos_sistemas_urinario,
        historiaClinicaActualizado.revision_actual_organos_sistemas_musculo_esqueletico= revision_actual_organos_sistemas_musculo_esqueletico ? revision_actual_organos_sistemas_musculo_esqueletico : historiaClinicaActualizado.revision_actual_organos_sistemas_musculo_esqueletico,
        historiaClinicaActualizado.revision_actual_organos_sistemas_endocrinico= revision_actual_organos_sistemas_endocrinico ? revision_actual_organos_sistemas_endocrinico : historiaClinicaActualizado.revision_actual_organos_sistemas_endocrinico,
        historiaClinicaActualizado.revision_actual_organos_sistemas_hemo_linfaticos= revision_actual_organos_sistemas_hemo_linfaticos ? revision_actual_organos_sistemas_hemo_linfaticos : historiaClinicaActualizado.revision_actual_organos_sistemas_hemo_linfaticos,
        historiaClinicaActualizado.revision_actual_organos_sistemas_nervioso= revision_actual_organos_sistemas_nervioso ? revision_actual_organos_sistemas_nervioso : historiaClinicaActualizado.revision_actual_organos_sistemas_nervioso,
        historiaClinicaActualizado.signos_vitales_antropometria_fecha_medicion= signos_vitales_antropometria_fecha_medicion ? signos_vitales_antropometria_fecha_medicion : historiaClinicaActualizado.signos_vitales_antropometria_fecha_medicion,
        historiaClinicaActualizado.signos_vitales_antropometria_temperatura= signos_vitales_antropometria_temperatura ? signos_vitales_antropometria_temperatura : historiaClinicaActualizado.signos_vitales_antropometria_temperatura,
        historiaClinicaActualizado.signos_vitales_antropometria_presion_arterial= signos_vitales_antropometria_presion_arterial ? signos_vitales_antropometria_presion_arterial : historiaClinicaActualizado.signos_vitales_antropometria_presion_arterial,
        historiaClinicaActualizado.signos_vitales_antropometria_pulso= signos_vitales_antropometria_pulso ? signos_vitales_antropometria_pulso : historiaClinicaActualizado.signos_vitales_antropometria_pulso,
        historiaClinicaActualizado.signos_vitales_antropometria_peso= signos_vitales_antropometria_peso ? signos_vitales_antropometria_peso : historiaClinicaActualizado.signos_vitales_antropometria_peso,
        historiaClinicaActualizado.signos_vitales_antropometria_talla= signos_vitales_antropometria_talla ? signos_vitales_antropometria_talla : historiaClinicaActualizado.signos_vitales_antropometria_talla,
        historiaClinicaActualizado.examen_fisico_regional_cabeza= examen_fisico_regional_cabeza ? examen_fisico_regional_cabeza : historiaClinicaActualizado.examen_fisico_regional_cabeza,
        historiaClinicaActualizado.examen_fisico_regional_cuello= examen_fisico_regional_cuello ? examen_fisico_regional_cuello : historiaClinicaActualizado.examen_fisico_regional_cuello,
        historiaClinicaActualizado.examen_fisico_regional_torax= examen_fisico_regional_torax ? examen_fisico_regional_torax : historiaClinicaActualizado.examen_fisico_regional_torax,
        historiaClinicaActualizado.examen_fisico_regional_abdomen= examen_fisico_regional_abdomen ? examen_fisico_regional_abdomen : historiaClinicaActualizado.examen_fisico_regional_abdomen,
        historiaClinicaActualizado.examen_fisico_regional_pelvis= examen_fisico_regional_pelvis ? examen_fisico_regional_pelvis : historiaClinicaActualizado.examen_fisico_regional_pelvis,
        historiaClinicaActualizado.examen_fisico_regional_extremidades= examen_fisico_regional_extremidades ? examen_fisico_regional_extremidades : historiaClinicaActualizado.examen_fisico_regional_extremidades,
        historiaClinicaActualizado.diagnostico= diagnostico ? diagnostico : historiaClinicaActualizado.diagnostico,
        historiaClinicaActualizado.planes_tratamiento= planes_tratamiento ? planes_tratamiento : historiaClinicaActualizado.planes_tratamiento,
        historiaClinicaActualizado.firma= firma ? firma : historiaClinicaActualizado.firma,
        
        

        await historiaClinicaActualizado.save();
        res.status(200).json(historiaClinicaActualizado);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
        
}
export const deleteHistoriaClinicaById = async (req, res)=>{
    try {
        const {id} = req.params;
        await HistoriaClinica.destroy({
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

const obtenerHistoriasClinicas =async  ()=>{
    const historiasClinicas = await HistoriaClinica.findAll({
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
    return historiasClinicas;
}

const obtenerEvolucionesPrescripcionesHistoriaClinica =async  (id)=>{
    const evolucionesPrescripcionesHistoriaClinica = await EvolucionPrescripcion.findAll({
        include: [ 
            { 
                model: Consultorio, 
                as: 'consultorio_evolucion_prescripcion' 
            },
            { 
                model: HistoriaClinica, 
                as: 'historia_clinica_evolucion_prescripcion' 
            },
            { 
                model: Usuario, 
                as: 'usuario_evolucion_prescripcion' 
            }   
        ],
        where : {
            historia_clinica_id : id
        }
    });
    return evolucionesPrescripcionesHistoriaClinica;
}
