import { Evento } from "./Evento.js";
import { Sincronizacion } from "./Sincronizacion.js";
import { Paciente } from "./Paciente.js";
import { DataTypes,Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";



export const Medico = sequelize.define(
    "medicos",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
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
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
    },
  
  );

//relacionando con evento
Medico.hasMany(Evento, {
  foreignKey: "medicoId",
  sourceKey: "id",
  allowNull:false,
});

Evento.belongsTo(Medico, {
  foreignKey: "medicoId",
  targetId: "id",
  allowNull:false,
});



