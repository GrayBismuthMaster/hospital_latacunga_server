import {Usuario} from '../models/Usuario.js';
import {Rol} from '../models/Rol.js';
export const checkDuplicateUsernameOrEmail = async (req, res, next) =>{
    const user = await Usuario.findOne({username : req.body.username});
    if (user) return res.status(400).json({message: "The user already exists"});
    const email = await Usuario.findOne({email : req.body.email});
    if (email) return res.status(400).json({message: "The email already exists"});
    next();

}
// export const checkRolesExisted = async (req, res, next) => {
//     const roles = await Rol.find({}, {nombreRol:1, _id:0})
    
//     if(req.body.roles) {
//        const nombreRoles = roles.map( roles => roles.nombreRol)
//         for(let i = 0 ; i < req.body.roles.length ; i++){
//             if(!nombreRoles.includes(req.body.roles[i])){
//                 return res.status(400).json({
//                     message : `Role ${req.body.roles[i]} does not exists`
//                 });
//             }
            
//         }
//     }
//     next();
// }
