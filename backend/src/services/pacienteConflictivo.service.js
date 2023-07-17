import { PacienteConflictivo } from "../models/PacienteConflictivo.js";
import { sequelize } from "../database/database.js";
import { Evento } from "../models/Evento.js";
import { PacientesService } from "./paciente.service.js";
import { Paciente } from "../models/Paciente.js";

export const PacientesConflictivosService = {
  getAll,
  getPacientesYConflictos,
  resolver,
  upsertarPorDNINacimientoYComputadoraId,
  apartarConflictos,
};

async function apartarConflictos(pacientes, computadoraId) {
  let pacientesNoConflictivos = [];

  const pacientesFiltrados = pacientes.map((p) => {
    let pNew = p;
    delete pNew.id;
    return pNew;
  });

  for (const paciente of pacientesFiltrados) {
    const pAux = await PacientesService.getPorDniYNacimiento(paciente);
    let pacienteEncontrado = pAux.dataValues;
    delete pacienteEncontrado.id;

    const sonIguales =
      JSON.stringify(paciente) === JSON.stringify(pacienteEncontrado);

    if (sonIguales) {
      pacientesNoConflictivos.push(paciente);
    } else {
      upsertarPorDNINacimientoYComputadoraId({ ...paciente, computadoraId });
    }
  }

  return pacientesNoConflictivos;
}

async function getAll() {
  const pacientes = await PacienteConflictivo.findAll();

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function getPacientesYConflictos() {
  const pacientesConflictivos = await PacienteConflictivo.findAll();

  let pacientesMappeados = [];

  for(const conflicto of pacientesConflictivos){
    pacientesMappeados.push({paciente: await PacientesService.getPorDniYNacimiento(conflicto),conflicto})
  }

  return { pacientesConflictivos: pacientesMappeados };
}

async function resolver(pacienteConflictivo) {
  let upsertado = {};

  await sequelize.transaction(async (t) => {
    await PacienteConflictivo.destroy({
      where: { conflictoId: pacienteConflictivo.conflictoId },
      transaction: t,
    });

    let paciente = { ...pacienteConflictivo };
    delete paciente.computadoraId;
    delete paciente.conflictoId;

    
    upsertado = await PacientesService.upsertarPorDNIyNacimiento(paciente, t);
    
    return true
  });
  

  return upsertado;
}

async function upsertarPorDNINacimientoYComputadoraId(paciente) {
  const pacienteFound = await PacienteConflictivo.findOne({
    where: {
      dni: paciente.dni,
      fechaNacimiento: paciente.fechaNacimiento,
      computadoraId: paciente.computadoraId,
    },
  });

  PacienteConflictivo.upsert(paciente);
}
