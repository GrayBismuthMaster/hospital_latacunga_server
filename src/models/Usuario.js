import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';
import bcrypt from 'bcrypt';
export const Usuario = sequelize.define('usuarios',{
    id                  :   {
                                type : DataTypes.INTEGER,
                                primaryKey : true, 
                                autoIncrement : true
                            },
    primer_nombre              :   { 
                                type: DataTypes.TEXT,
                                required:true
                            },
                            
    segundo_nombre      :   { 
                                type: DataTypes.TEXT,
                                required:true
                            },
                            
    apellido_paterno    :   { 
                                type: DataTypes.TEXT,
                                required:true
                            },
    apellido_materno    :   { 
                                type: DataTypes.TEXT,
                                required:true
                            },
    cedula_identidad    :   {
                                type:DataTypes.TEXT,
                                required:true
                            },
    fecha_nacimiento    :   {
                                type:DataTypes.DATE,
                            },
    sexo                :   {
                                type : DataTypes.TEXT,
                                defaultValue: 'M',
                                validate: {
                                    customValidator: (value) => {
                                        const enums = ['M','F']
                                        if (!enums.includes(value)) {
                                            throw new Error('not a valid option')
                                        }
                                    }
                                }
                            },
    telefono            :   {
                                type:DataTypes.TEXT
                            },
    estado              :   {
                                type: DataTypes.BOOLEAN,
                                default: true
                            },
    imagen              :   {
                                type:DataTypes.TEXT
                            },
    username            :   {
                                type:DataTypes.TEXT, 
                                unique:true
                            },
    email               :   {
                                type: DataTypes.TEXT,
                                required: true
                            },
    password            :   {
                                type: DataTypes.TEXT,
                                
                                required:true
                            },
    // roles               :   [{                                
    //                             ref: "Rol",
    //                             type: mongoose.Schema.Types.ObjectId      
    //                         }]
});
//TODO: ROLES 1 A M 
Usuario.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
Usuario.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}
Usuario.calcularEdad = (fecha)=> {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}