import {Rol} from '../models/Rol.js'
import dotenv from 'dotenv';
dotenv.config({path : 'variables.env'})

export const createRol = async (req, res) =>{
        let 
        {
            nombreRol,
        } = req.body;
        try {
            const savedRol = await Rol.create({
                nombreRol,
                });
           res.status(202)
           .send({
                message:"Creación completa",
                datosRolCreado : savedRol,
            })
        } catch (error) {
            res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
        }
        
}
export const getRoles = (req, res) =>{
      //res.send("Welcome to rol ");
      let roles = obtenerRoles();
      roles.then((accesoRoles)=>{
          res.json(accesoRoles)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getRolById = async (req, res) =>{
    try {
        const {id} = req.params;
        const rol = await Rol.findOne({
            where : {
                id
            }
        });
        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({"error":"Algo ha pasado mal :c", "descripcion" : error})
    }
}
export const deleteRolById = async (req, res)=>{
    try {
        const {id} = req.params;
        await Rol.destroy({
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

const obtenerRoles =async  ()=>{
    const roles = await Rol.findAll();
    return roles;
}
