import { DataTypes,Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";
import { MedicoUsuario } from "./MedicoUsuario.js";

const getFechaMas30Minutos = () => {

  let d = new Date(); 
  let v = new Date(); 
  v.setMinutes(d.getMinutes()+30); 

  return v;
}

export const TokenUsuario = sequelize.define(
  "tokensUsuarios",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    validoHasta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: getFechaMas30Minutos
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  },

);

MedicoUsuario.hasMany(TokenUsuario, {
  foreignKey: "medicoId",
  sourceKey: "id",
  allowNull:false,
});

TokenUsuario.belongsTo(MedicoUsuario, {
  foreignKey: "medicoId",
  targetId: "id",
  allowNull:false,
});

