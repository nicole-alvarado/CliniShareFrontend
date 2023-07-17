import { SesionActiva } from "../models/SesionActiva.js";
import bcrypt from "bcrypt";

export const sesionActivaService = {
  nueva,
  cerrar,
  comprobarToken
};

async function nueva(medicoEncontrado) {
  try {
    const token = await bcrypt.hash("token", bcrypt.genSaltSync(8));
    // eliminamos todos los tokens ya que solo hay una sesion a la vez

    const nuevoToken = await SesionActiva.create({ token,medicoId:medicoEncontrado["id"] });

    if (!nuevoToken) {
      return {};
    }

    return token;
  } catch (error) {
    console.log( "No se pudo registrar crear nuevo token, error: " + error);
    return {}
  }
}


async function cerrar(token) {
  try {
    const tokenRecibido = await SesionActiva.destroy({
      where: {
        token,
      },
    });

    return token;
  } catch (error) {
    console.log( "No se pudo registrar crear nuevo token, error: " + error);
    return {}
  }
}

async function comprobarToken(token) {
  try {
    const tokenRecibido = await SesionActiva.findOne({
      where: {
        token,
      },
    });

    if (tokenRecibido) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log( "No se pudo comprobar token, error: " + error);
    return false
  }
}



