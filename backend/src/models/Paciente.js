import { DataTypes,Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";
import { Evento } from "./Evento.js";

export const Paciente = sequelize.define(
  "pacientes",
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
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaDefuncion: {
      type: DataTypes.DATE,
      allowNull: true,
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
    email:{
      type:DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//relacionando con evento
Paciente.hasMany(Evento,{
  foreignKey: 'pacienteId',
  sourceKey: 'id',
  allowNull:false,
})

Evento.belongsTo(Paciente,{
  foreignKey: 'pacienteId',
  targetId: 'id',
  allowNull:false,
})