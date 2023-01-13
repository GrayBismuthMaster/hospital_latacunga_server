import Sequelize, { DataTypes } from 'sequelize';
import {sequelize} from '../config/database/db.js';

export const Rol = sequelize.define('roles',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    nombreRol : {
        type : DataTypes.TEXT,
        allowNull : false,
        unique : true
    }
},{
    timestamp : false
});