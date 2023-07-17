import { DataTypes,Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";
import {SesionActiva} from "./SesionActiva.js";


export const MedicoUsuario = sequelize.define(
  "medicosUsuarios",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genero:{
      type:DataTypes.STRING,
    },
    sexo:{
      type:DataTypes.STRING,
    },
    telefono:{
      type:DataTypes.STRING,
    },
    direccion:{
      type:DataTypes.STRING,
    },
    verificado:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  },

);

MedicoUsuario.hasOne(SesionActiva, {
  foreignKey: "medicoId",
  sourceKey: "id",
  allowNull:false,
});

SesionActiva.belongsTo(MedicoUsuario, {
  foreignKey: "medicoId",
  targetId: "id",
  allowNull:false,
});

