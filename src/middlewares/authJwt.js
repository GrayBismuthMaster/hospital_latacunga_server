import jwt from 'jsonwebtoken';
import {Usuario} from '../models/Usuario.js';
// import Rol from '../models/Rol';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});
//THis function tries to verify the token, and allows to continue
export const verifyToken = async (req, res, next) =>{
    try{
        //Con JWT en localStorage
        /*
        const token  = req.headers["x-access-token"];
        if(!token) return res.status(403).json({message: "No token provided"})
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        const user = await Usuario.findById(req.userId, {password: 0});
        if(!user) return res.status(404).json({message: "No user found"});
        next();
        */
       const accessToken = req.cookies.accessToken;
       console.log('token desde mobile',accessToken);
       const decoded = jwt.verify(accessToken, process.env.ACCESSTOKEN);
       req.userId = decoded.id;
       const user = await Usuario.findByPk(req.userId);
       if(!user) return res.status(404).json({message: "Usuario no encontrado"});
       next();
    } catch(error){
        return res.status(401).json({success:false, message: "Token expirado"})
    } 
    
}

//This function tries to verify user roles
// export const isModerator = async (req, res, next) =>{
//     //we get id from last function and compare both
//     const user = await Usuario.findById(req.userId);
//     const roles = await Rol.find({_id: {$in: user.roles}})
//     console.log(roles);
//     for(let i = 0; i < roles.length; i++){
//         if(roles[i].nombreRol === 'moderator'){
//             next();
//             return;
//         }
//     }
//     return res.status(403).json({message: "Moderator role is required"});

// }
// export const isAdmin = async(req, res, next) =>{
//     //we get id from last function and compare both
//     const user = await Usuario.findById(req.userId);
//     const roles = await Rol.find({_id: {$in: user.roles}})
//     console.log(roles);
//     for(let i = 0; i < roles.length; i++){
//         if(roles[i].nombreRol === 'admin'){
//             next();
//             return;
//         }
//     }
//     return res.status(403).json({message: "Admin role is required"});

// }
export const verifyTokenReturnUser = async (req, res) =>{
    try{
        //Con JWT en localStorage
        /*
        const token  = req.headers["x-access-token"];
        if(!token) return res.status(403).json({message: "No token provided"})
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        const user = await Usuario.findById(req.userId, {password: 0});
        if(!user) return res.status(404).json({message: "No user found"});
        next();
        */
       const accessToken = req.headers["x-access-token"];
       console.log('Token desde server verificando')
       console.log(accessToken);
       const decoded = jwt.verify(accessToken, process.env.ACCESSTOKEN);
       req.userId = decoded.id;
       const user = await Usuario.findByPk(req.userId);
       if(!user) return res.status(404).json({message: "Usuario no encontrado"});
    //    return res.status(200).json({success: true, user: user, token: req.cookies.accessToken});
    
    return res.status(200).json({success: true, user: user, token: accessToken});
    } catch(error){
        return res.status(401).json({success:false, message: "Token expirado"})
    } 
    
}