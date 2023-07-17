import { Medico } from "../models/Medico.js";

export const MedicosService = {
  getMedicos: () => getMedicosFromModel(),
  getMedicoByDni: (dniABuscar) => getMedicoByDniFromModel(dniABuscar),
  createMedico: (medico) => createMedicoFromModel(medico),
  getMedicoById: (id) => getMedicoByIdFromModel(id),
  obtenerMedicoIdAPartirDeMedicoUser,
  getMedicoAPartirDeUser,
  obtenerMedicoAPartirDeMedicoUser
};

async function getMedicosFromModel() {
  const medicos = await Medico.findAll();

  if (medicos.length === 0) {
    return [];
  } else {
    return medicos;
  }
}
async function getMedicoAPartirDeUser(medicoUser){
  const medicoFound =  await Medico.findOne({ where: {
    email:medicoUser.email,
  } });

  if(medicoFound){
    return medicoFound;
  }
}

async function obtenerMedicoIdAPartirDeMedicoUser(medicoUser) {
  const medicoFound =  await Medico.findOne({ where: {
    email:medicoUser.email,
  } });

  if(medicoFound){
    return medicoFound.id
  }
}

async function obtenerMedicoAPartirDeMedicoUser(medicoUser) {
  const medicoFound =  await Medico.findOne({ where: {
    email:medicoUser.email,
  } });

  if(medicoFound){
    return medicoFound
  }
}

async function createMedicoFromModel(medico) {
  try {
    let newMedico = await Medico.create(medico);

    return newMedico;
  } catch (error) {
    console.log("No se pudo crear médico, error: " + error);
    return {};
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
