import { DataTypes ,Sequelize} from "sequelize";
import { sequelize } from "../database/database.js";

const descripcionLength = 1000; 

export const Evento = sequelize.define("eventos",{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING(descripcionLength),
        allowNull:false,
    },
    importante:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull: false,
    },
    fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: true,
      },
},{
    freezeTableName: true,
    timestamps: true
});