import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { TokenUsuario } from "../models/TokenUsuario.js";
import { Op } from "sequelize";
import { sequelize } from "../database/database.js";
import { Medico } from "../models/Medico.js";

export const TokenUsuarioService = {
  validarTokenYUsuario,
  nuevoToken,
};

async function nuevoToken(user,transaction) {

  const tokenNuevo = { medicoId: user.id };
  try {
    const tokenRecibido = await TokenUsuario.create(tokenNuevo,{transaction});

    return tokenRecibido;
  } catch (error) {
    console.log("Error en la creación de token nuevo (nuevoToken) " + error);
  }
}

async function validarTokenYUsuario(token) {
  try {
    const tokenEncontrado = await TokenUsuario.findOne({
      where: {
        validoHasta: { [Op.gt]: new Date() },
        id: token.id,
      },
    });

    if (!tokenEncontrado) {
      return false;
    } else {
      const userEncontrado = await MedicoUsuario.findOne({
        where: { id: tokenEncontrado.medicoId },
      });

      await sequelize.transaction(async (t) => {
        let userEncontradoNew = {...userEncontrado.dataValues};

        userEncontradoNew.verificado =true;
        await MedicoUsuario.update(userEncontradoNew,{
          where:{
            id:userEncontradoNew.id
          },
          transaction: t,
        });

        await Medico.create(userEncontradoNew, { transaction: t });

        await tokenEncontrado.destroy();
      });

      return true;
    }
  } catch (error) {
    console.log("error en validarTokenYUsuario: " + error);
    return false;
  }
}
