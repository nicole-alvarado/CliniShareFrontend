import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import Sequelize from "sequelize";

export const Sincronizacion = sequelize.define("sincronizaciones",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now")
    },
    computadoraId:{
        type: Sequelize.UUID,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
});

