import {Usuario} from '../models/Usuario.js'
import {Rol} from '../models/Rol.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path : 'variables.env'})

export const createUser = async (req, res) =>{
        let 
        {
            primer_nombre,
            segundo_nombre,
            apellido_paterno,
            apellido_materno,
            cedula_identidad,
            fecha_nacimiento,
            sexo, 
            telefono,
            estado,
            imagen,
            username,
            email,
            password,
            id_rol,
        } = req.body;
        try {
            const savedUser = await Usuario.create({
                
                primer_nombre,
                segundo_nombre,
                apellido_paterno,
                apellido_materno,
                cedula_identidad,
                fecha_nacimiento,
                sexo, 
                telefono,
                estado,
                imagen,
                username,
                email,
                password : await Usuario.encryptPassword(password),
                id_rol
            });
            

            //Token para 24 horas
            const accessToken = jwt.sign({id: savedUser.id},process.env.ACCESSTOKEN,{
            expiresIn: 86400
            })
            const refreshToken = jwt.sign({id: savedUser.id},process.env.REFRESHTOKEN,{
                expiresIn: 86400
            })
           //Cookies
           // En el date la cookie esta para 300 seconds
           res.status(202)
            .cookie('accessToken', accessToken, 
            {
                expires: new Date( new Date().getTime() + 300 * 100), 
                sameSite: 'strict',
                 httpOnly: true
            })
            .cookie('refreshToken',refreshToken,{
                expires: new Date( new Date().getTime() + 300 * 100), 
                sameSite: 'strict',
                httpOnly: true
            })
            .send({
                message:"Creación completa",
                datosUsuarioCreado : await usuarioConPopulate(savedUser.id),
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getUsers = (req, res) =>{
      //res.send("Welcome to user ");
      let usuarios = obtenerUsuarios();
      usuarios.then((accesoUsuarios)=>{
          res.json(accesoUsuarios)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getUsersByRol = (req, res) =>{
    const {id} = req.params;
    let usuarios = obtenerUsuariosPorRol(id);
    usuarios.then((accesoUsuarios)=>{
        res.json(accesoUsuarios)
    })
    .catch((error)=>{
        console.log(error);
    })
}

export const getUserById = async (req, res) =>{
    try {
        const {id} = req.params;
        const usuario = await Usuario.findOne({    
            include: [ 
                { 
                    model: Rol, 
                    as: 'role' 
                } 
            ], 
            where : {
                id
            }
        });
        console.log(usuario)
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const updateUserById = async (req, res) =>{
        
    try {
        //Para obtener datos actualizados el tercer param
        const {id} = req.params;
        const {
            primer_nombre,
            segundo_nombre,
            apellido_paterno,
            apellido_materno,
            cedula_identidad,
            sexo, 
            telefono,
            estado,
            imagen,
            username,
            email,
            password,
            id_rol
        } = req.body;

        const usuarioActualizado = await Usuario.findOne({
            include: [ 
                { 
                    model: Rol, 
                    as: 'role' 
                } 
            ], 
            where : {
                id
            }
        });

        usuarioActualizado.primer_nombre = primer_nombre ? primer_nombre : usuarioActualizado.primer_nombre,
        usuarioActualizado.segundo_nombre = segundo_nombre ? segundo_nombre : usuarioActualizado.segundo_nombre,
        usuarioActualizado.apellido_paterno = apellido_paterno ? apellido_paterno : usuarioActualizado.apellido_paterno,
        usuarioActualizado.apellido_materno = apellido_materno ? apellido_materno : usuarioActualizado.apellido_materno,
        usuarioActualizado.cedula_identidad = cedula_identidad ? cedula_identidad : usuarioActualizado.cedula_identidad,
        usuarioActualizado.sexo = sexo ? sexo : usuarioActualizado.sexo
        usuarioActualizado.telefono = telefono ? telefono : usuarioActualizado.telefono;
        usuarioActualizado.estado = estado ? estado : usuarioActualizado.estado;
        usuarioActualizado.imagen = imagen ? imagen : usuarioActualizado.imagen;
        usuarioActualizado.username = username ? username : usuarioActualizado.username;
        usuarioActualizado.email = email ? email : usuarioActualizado.email
        usuarioActualizado.password = password ? await Usuario.encryptPassword(password) : usuarioActualizado.password; 
        usuarioActualizado.id_rol = id_rol ? id_rol : usuarioActualizado.id_rol

        await usuarioActualizado.save();
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
        
}
export const deleteUserById = async (req, res)=>{
    try {
        const {id} = req.params;
        await Usuario.destroy({
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

const obtenerUsuarios =async  ()=>{
    const usuarios = await Usuario.findAll({ include: [ { model: Rol, as: 'role' } ] });
    return usuarios;
}

const usuarioConPopulate = async (id)=>{
    
    const usuarioId = await Usuario.findOne({
        include: [ 
            { 
                model: Rol, 
                as: 'role' 
            } 
        ], 
        where : {
            id
        }
    });
    return usuarioId;
}
const obtenerUsuariosPorRol = async(id)=>{
    const usuariosPorRol = await Usuario.findAll({
        include: [ 
            { 
                model: Rol, 
                as: 'role' 
            } 
        ], 
        where : {
            id_rol : id
        }
    })
    return usuariosPorRol;
}