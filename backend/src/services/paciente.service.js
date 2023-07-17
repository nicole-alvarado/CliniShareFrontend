import { Paciente } from "../models/Paciente.js";
import { sequelize } from "../database/database.js";
import { Evento } from "../models/Evento.js";


export const PacientesService = {
  getPacientes: () => getPacientesFromModel(),
  createPaciente: (paciente) => createPacienteFromModel(paciente),
  getPacienteByDni: (dniABuscar) => getPacienteByDniFromModel(dniABuscar),
  getPacienteById: (id) => getPacienteByIdFromModel(id),
  getDnisDePacientes: () => getDnisDePacientesFromModel(),
  getUUIDSDePacientes: () => getUUIDSDePacientesFromModel(),
  getInterseccionDNIS: (dnis) => getInterseccionDNISFromModel(dnis),
  getInterseccionDNISyFechas,
  getPacientesPorDnis: (dnis) => getPacientesPorDnisFromModel(dnis),
  getEntidadesPacientesPorDnis: (dnis) =>
    getEntidadesPacientesPorDnisFromModel(dnis),
  updatePacientePorId: (paciente, id) =>
    updatePacientePorIdFromModel(paciente, id),
  getDnisYNacimientosDePacientes,
  upsertarPorDNIyNacimiento,
  getIdPorDniYNacimiento,
  getPorDniYNacimiento,
};

async function getPacientesFromModel() {
  const pacientes = await Paciente.findAll();

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function getEntidadesPacientesFromModel() {
  const pacientes = await Paciente.findAll({
    include: [
      {
        model: Evento,
      },
    ],
  });

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function createPacienteFromModel(paciente) {
  try {
    let newPaciente = {};

    await sequelize.transaction(async (t) => {
      newPaciente = await Paciente.create(paciente, {
        transaction: t,
      });
    });

    return newPaciente;
  } catch (error) {
    console.log("No se pudo cargar el paciente. " + error);
    return {};
  }
}

async function updatePacientePorIdFromModel(paciente, id) {
  try {
    const response = await Paciente.update(paciente, {
      where: { id: id },
    });

    return response;
  } catch (error) {
    console.log(error);

    return {};
  }
}

async function getPacienteByDniFromModel(dniABuscar) {
  const paciente = await Paciente.findOne({
    where: {
      dni: dniABuscar,
    },
  });

  if (!paciente) {
    return {};
  } else {
    return paciente;
  }
}

async function getPacienteByIdFromModel(id) {
  const paciente = await Paciente.findOne({
    where: {
      id: id,
    },
  });

  if (!paciente) {
    return {};
  } else {
    return paciente;
  }
}

async function getDnisDePacientesFromModel() {
  const pacientes = await Paciente.findAll({
    attributes: ["dni"],
  });

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function getDnisYNacimientosDePacientes() {
  const pacientes = await Paciente.findAll({
    attributes: ["dni","fechaNacimiento"],
  });

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes.map((x)=>{return x.dataValues});
  }
}

async function getIdPorDniYNacimiento(paciente){
  const pacienteFound = await Paciente.findOne({
    where:{
      dni:paciente.dni,
      fechaNacimiento:paciente.fechaNacimiento
    }
  });


  if (!pacienteFound) {
    return {};
  } else {
    return pacienteFound.id;
  }
}

async function getPorDniYNacimiento(paciente){
  const pacienteFound = await Paciente.findOne({
    where:{
      dni:paciente.dni,
      fechaNacimiento:paciente.fechaNacimiento
    }
  });


  if (!pacienteFound) {
    return {};
  } else {
    return pacienteFound;
  }
}


async function getUUIDSDePacientesFromModel() {
  const pacientes = await Paciente.findAll({
    attributes: ["id"],
  });

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function getInterseccionDNISFromModel(dnis) {
  let dnisInterseccion = [];

  const pacientes = await getDnisDePacientesFromModel();
  const newPacientes = pacientes.map((x) => x.dni);
  const newDnis = dnis.map((x) => x.dni);

  dnisInterseccion = newDnis.filter((value) => newPacientes.includes(value));
  dnisInterseccion = dnisInterseccion.filter((value) =>
    newDnis.includes(value)
  );

  return dnisInterseccion;
}

async function getInterseccionDNISyFechas(dnisyFechas) {
  let dnisYFechasInterseccion = [];

  
  const dnisYNacimientos = (await getDnisYNacimientosDePacientes()).map((x)=>{
    return {dni:x.dni,fechaNacimiento:x.fechaNacimiento }
  });
  const localDnisYfechas = dnisYNacimientos.map((x) => {return {dni:x.dni, fechaNacimiento: x.fechaNacimiento}});
  const newDnisyFechas = dnisyFechas.map((x)=>{
    return {...x, fechaNacimiento:new Date(x.fechaNacimiento)}
  });

  dnisYFechasInterseccion = newDnisyFechas.filter((value) => localDnisYfechas.some(elem => JSON.stringify(value) === JSON.stringify(elem)));
  dnisYFechasInterseccion = dnisYFechasInterseccion.filter((value) =>
  newDnisyFechas.some(elem => JSON.stringify(value) === JSON.stringify(elem))
  );

  return dnisYFechasInterseccion;
}

async function getPacientesPorDnisFromModel(dnisPacientes) {
  if (dnisPacientes.length === 0) {
    return [];
  }

  let todosLosPacientes = await getPacientesFromModel();

  // FILTRAR
  let pacientesFiltrados = todosLosPacientes.filter((value) =>
    dnisPacientes.includes(value.dni)
  );

  return pacientesFiltrados;
}

async function getEntidadesPacientesPorDnisFromModel(dnisPacientes) {
  if (dnisPacientes.length === 0) {
    return [];
  }

  let todosLosPacientes = await getEntidadesPacientesFromModel();

  // FILTRAR
  let pacientesFiltrados = todosLosPacientes.filter((value) =>
    dnisPacientes.includes(value.dni)
  );

  return pacientesFiltrados;
}


async function upsertarPorDNIyNacimiento(paciente,transaction){
  const pacienteFound = await Paciente.findOne({
    where: {
      dni: paciente.dni,
      fechaNacimiento: paciente.fechaNacimiento
    }
  });

  if(pacienteFound){
    paciente.id = pacienteFound.id;
  }

  await Paciente.upsert(paciente,{transaction});
}

