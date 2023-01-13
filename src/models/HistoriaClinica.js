import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';

export const HistoriaClinica = sequelize.define('historias_clinicas',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    primer_nombre : {
        type : DataTypes.TEXT,
    },
    segundo_nombre : {
        type : DataTypes.TEXT
    },
    apellido_paterno : {
        type : DataTypes.TEXT
    },
    apellido_materno : {
        type : DataTypes.TEXT,
    },
    cedula_identidad : {
        type : DataTypes.TEXT,
    },
    // sexo : {
    //     type : DataTypes.ENUM('M', 'F'),
    // },
    fecha_nacimiento : {
        type : DataTypes.DATE
    },
    edad : {
        type : DataTypes.DATE,
        
    },
    codigo : {
        type : DataTypes.TEXT
    },
    motivo_consulta : {
        type : DataTypes.TEXT
    },
    antecedentes_personales : {
        type : DataTypes.TEXT
    },
    antecedentes_familiares : {
        type : DataTypes.TEXT,
    },
    enfermedad_actual : {
        type : DataTypes.TEXT
    },
    revision_actual_organos_sistemas : {
        type : DataTypes.ARRAY(DataTypes.JSON)
    },
    signos_vitales_antropometria_fecha_medicion : {
        type : DataTypes.DATE
    },
    signos_vitales_antropometria_temperatura : {
        type : DataTypes.INTEGER
    },
    signos_vitales_antropometria_presion_arterial : {
        type : DataTypes.TEXT
    },
    signos_vitales_antropometria_pulso : {
        type : DataTypes.TEXT
    },
    signos_vitales_antropometria_peso : {
        type : DataTypes.FLOAT
    },
    signos_vitales_antropometria_talla : {
        type : DataTypes.FLOAT
    },
    examen_fisico_regional : {
        type : DataTypes.ARRAY(DataTypes.JSON)
    },
    diagnostico : {
        type : DataTypes.ARRAY(DataTypes.JSON)
    },
    planes_tratamiento : {
        type : DataTypes.TEXT
    },
    firma : {
        type : DataTypes.TEXT
    }
});
// ID MEDICO IRA EN ASSOCIATIONS CON LA RELACION
// ESPECIALIDADES VA COMO RELACION IRIA ESPECIALIDAD
//EN LA REVISION ACTUAL DE ORGRANOS Y SENTIDOS HAY CHECKBOX
//CON CONDICIONAL PARA DESCRIPCION O NO
//FECHA Y HORA NECESARIO PREGUNTAR ... POR AHORA TIMESTAMPS 

HistoriaClinica.calcularEdad = (fecha)=> {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}