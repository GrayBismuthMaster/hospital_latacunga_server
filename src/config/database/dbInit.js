import Client from "pg";
import app from '../../app.js'
import {sequelize} from './db.js'

import '../../models/HistoriaClinica.js';
import './asociations.js';
import {Rol} from '../../models/Rol.js'
export const dbInit =async ()=>{
    
    const client = new Client.Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        database: "postgres",
        port : '5433'
      });
      
      await client.connect();
      
      await client.query('CREATE DATABASE "hospital_latacunga"',async (err, res) => {
        console.log(err, res);
        if(err){
            try {
                
                await client.end();   
                sequelize.sync({alter : true}).then(async ()=>{
                    try {
                        const count = await Rol.count();
                        console.log(count)
                        if(count >0){
                        await app.listen('5001',()=>{
                            console.log(`Servidor Levantado en el puerto 5001`);
                            console.log('conectado y generado'); 
                        }); 
                        }else{
                            await Promise.all([
                                Rol.create({nombreRol : "admin"}),
                                Rol.create({nombreRol : "user"}), 
                            ]);
                        };
                        
                    } catch (error) {
                        console.log(error);
                    }
                });     
            } catch (error) {
                console.log(error)
            }
               
            
        }else{
            //{force:true} || {alter:true}
            sequelize.sync({alter:true}).then(()=>{
                console.log('conectado y generado');
            });    
            
            await client.end();

        }
      });
}