import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import Sequelize from "sequelize";

export const ComputadoraLocal = sequelize.define("computadoraLocal",{
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
      publicKey:{
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      privateKey:{
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      certificateSigned:{
        type: DataTypes.STRING(2048),
        allowNull: false,
      },

},{
    freezeTableName: true,
    timestamps: false
});

