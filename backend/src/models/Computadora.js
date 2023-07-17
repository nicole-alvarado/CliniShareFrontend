import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import Sequelize from "sequelize";
import { PacienteConflictivo } from "./PacienteConflictivo.js";

export const Computadora  = sequelize.define("computadoras",{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
},{
    freezeTableName: true,
    timestamps: false
});


//relacionando con paciente conflictivo
Computadora.hasMany(PacienteConflictivo, {
  foreignKey: "computadoraId",
  sourceKey: "id",
  allowNull:false,
});

PacienteConflictivo.belongsTo(Computadora, {
  foreignKey: "computadoraId",
  targetId: "id",
  allowNull:false,
});
