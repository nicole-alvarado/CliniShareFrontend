import { DataTypes ,Sequelize} from "sequelize";
import { sequelize } from "../database/database.js";

export const SesionActiva = sequelize.define("sesionActiva",{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    token:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: true
});