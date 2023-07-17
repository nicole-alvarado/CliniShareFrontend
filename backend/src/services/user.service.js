import { MedicosUsuariosService } from "./medicoUsuario.service.js";
import { sesionActivaService } from "./sesionActiva.service.js";
import bcrypt from "bcrypt";
import { sequelize } from "../database/database.js";
import { Medico } from "../models/Medico.js";
import { MedicosService } from "./medico.service.js";
import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { QueryTypes } from "sequelize";
import { TokenUsuarioService } from "./tokenUsuario.service.js";
import { sendVerificationEmail } from "../email/utils.js";

export const userService = {
  login,
  register,
  modify,
  getAllMedicosUUIDSDeUsers,
};

async function generateHash(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
}

async function validPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

async function login(email, password) {
  let token = "";
  try {
    const medicoEncontrado = await MedicosUsuariosService.getMedicoByEmail(
      email
    );

    if (!medicoEncontrado) {
      return {};
    }

    if (!medicoEncontrado.verificado) {
      return {};
    }

    const passwordIsValid = await validPassword(
      password,
      medicoEncontrado.password
    );

    if (passwordIsValid) {
      token = await sesionActivaService.nueva(medicoEncontrado);
    }

    if (!token) {
      return {};
    } else {
      let user = quitarPassword(medicoEncontrado);
      const medico = await MedicosService.getMedicoAPartirDeUser(user);

      let dataValues = { ...medico.dataValues, ...user.dataValues };
      delete dataValues.id;

      user.medicoId = medico.id;

      const userARetornar = { ...user, ...dataValues };

      return { token, medico: userARetornar };
    }
  } catch (error) {
    console.log("No se pudo logear médico usuario, error: " + error);
    return {};
  }
}

function quitarPassword(medico) {
  let medicoFiltrado = { ...medico.dataValues };
  delete medicoFiltrado.password;

  return medicoFiltrado;
}

// async function register(medico) {
//   try {
//     const hash = await generateHash(medico.password);
//     const newMedico = { ...medico, password: hash };

//     // esto deberia ser una TRANSACCION
//     let responseUser = {};

//     await sequelize.transaction(async (t) => {
//       const userBuscado = await MedicoUsuario.findOne({
//         where: {
//           email: medico.email,
//         },
//       });

//       if (userBuscado) {
//         if (!userBuscado.verificado) {
//           await userBuscado.destroy({ transaction: t });
//         } else {
//           return false;
//         }
//       }

//       responseUser = await MedicoUsuario.create(newMedico, {
//         transaction: t,
//       });

//       //le creamos un token para que valide su usuario luego
//       const tokenNuevo = await TokenUsuarioService.nuevoToken(responseUser, t);

//       //le enviamos el token al mail para que pueda verificarlo
//       await sendVerificationEmail(responseUser.email, tokenNuevo.id);
//     });

//     //no le enviamos el hash al usuario para que no pueda bruteforcearlo
//     console.log("usuario a agregar: ", responseUser);
//     responseUser = quitarPassword(responseUser);

//     return responseUser;
//   } catch (error) {
//     console.log(error);
//     return {};
//   }
// }

async function register(medico) {
  try {
    const hash = await generateHash(medico.password);
    const newMedico = { ...medico, password: hash };

    // esto deberia ser una TRANSACCION
    let responseUser = {};

    await sequelize.transaction(async (t) => {
      responseUser = await MedicoUsuario.create(newMedico, {
        transaction: t,
      });
      await Medico.create(newMedico, { transaction: t });
    });

    //no le enviamos el hash al usuario para que no pueda bruteforcearlo
    responseUser = quitarPassword(responseUser);

    return responseUser;
  } catch (error) {
    console.log(error);
    return {};
  }
}


async function modify(medico) {
  try {
    let medicoNew = { ...medico };
    let hash = "";

    if (medico.password) {
      hash = await generateHash(medico.password);
      medicoNew = { ...medicoNew, password: hash };
    }

    if (await MedicosUsuariosService.modificar(medicoNew)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getAllMedicosUUIDSDeUsers() {
  try {
    const users = await sequelize.query(
      'SELECT medicos.id as id FROM medicos JOIN "medicosUsuarios" on medicos.email = "medicosUsuarios".email;',
      {
        type: QueryTypes.SELECT,
      }
    );
    return users;
  } catch (error) {
    console.log("Error getAllUsersUUIDS ", error);
  }
}
