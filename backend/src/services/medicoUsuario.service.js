import { Medico } from "../models/Medico.js";
import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { MedicosService } from "./medico.service.js";
import { sequelize } from "../database/database.js";


export const MedicosUsuariosService = {
  getMedicos: () => getMedicosFromModel(),
  getMedicoByDni: (dniABuscar) => getMedicoByDniFromModel(dniABuscar),
  getMedicoById: (id) => getMedicoByIdFromModel(id),
  getMedicoByEmail: getMedicoByEmailFromModel,
  getMedicoByToken,
  create,
  modificar,
};

async function create(user) {
  const userCreado = {};

  await sequelize.transaction(async (t) => {

    userCreado = await MedicoUsuario.create(user, {
      where: { id: user.id },
    });
    
    await MedicosService.createMedico(userCreado);
  });

  return quitarPassword(userCreado);
}

async function modificar(user) {
  await sequelize.transaction(async (t) => {
    const medicoViejo = await MedicosService.obtenerMedicoAPartirDeMedicoUser(user);
    
    const newUser = await MedicoUsuario.update(user, {
      where: { id: user.id },
    });

    delete user.id;
    delete user.password;

    const medicoNuevo = {...medicoViejo.dataValues, ...user};

    // console.log("\n\n\nmedico nuevo\n\n\n",medicoNuevo);

    await Medico.update(medicoNuevo, { where: { id: medicoViejo.id } });
  });

  return true;
}

async function getMedicosFromModel() {
  const medicos = await MedicoUsuario.findAll();

  if (medicos.length === 0) {
    return [];
  } else {
    return medicos;
  }
}

async function getMedicoByEmailFromModel(email) {
  const medico = await MedicoUsuario.findOne({
    where: {
      email,
    },
  });
  if (!medico) {
    return {};
  } else {
    return medico;
  }
}

async function getMedicoByDniFromModel(dniABuscar) {
  const medico = await Medico.findOne({
    where: {
      dni: dniABuscar,
    },
  });

  if (!medico) {
    return {};
  } else {
    return medico;
  }
}

async function getMedicoByIdFromModel(id) {
  const medico = await Medico.findOne({
    where: {
      id,
    },
  });

  if (!medico) {
    return {};
  } else {
    return medico;
  }
}

async function getMedicoByToken(token){
  const medico = await Medico.findOne({
    where: {
      token,
    },
  });

  if (!medico) {
    return {};
  } else {
    return medico;
  }
}