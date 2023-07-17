import axios from "./axiosInterceptado";
import rutas from "./rutas";

export const api = {
  guardarMedicoUsuario,
  login,
  guardarMedico,
  obtenerMedicoByDni,
  obtenerMedicoById,
  obtenerMedicos,
  modificarMedico,
  guardarPaciente,
  obtenerPacienteByDni,
  obtenerPacienteById,
  modificarPaciente,
  obtenerPacientes,
  crearEvento,
  guardarEventoObteniendoIds,
  obtenerEventoConPacienteYMedicoPorId,
  obtenerEventos,
  obtenerEventosCompletos,
  obtenerEventosPorPacienteId,
  obtenerEventosCompletosPorPacienteId,
  obtenerEventosCompletosImportantesPorPacienteId,
  modificarEvento,
  sincronizar,
  obtenerPacientesConConflictos,
  obtenerPacienteConflictivo,
  resolverConflictos,
  obtenerEventosPorFechas,
};

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// REGISTRARSE
async function guardarMedicoUsuario(Medico) {
  try {
    const response = await axios.post(rutas.nuevoMedicoUsuario, Medico);
    const medicoRespuesta = response.data;
    return Object.keys(medicoRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// LOGIN
async function login(email, password) {
  try {
    const response = await axios.post(rutas.LoginMedicoUsuario, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

// POST
async function guardarMedico(Medico) {
  try {
    const response = await axios.post(rutas.nuevoMedico, Medico);
    const medicoRespuesta = response.data;
    return Object.keys(medicoRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function guardarPaciente(Paciente) {
  try {
    const response = await axios.post(rutas.nuevoPaciente, Paciente);

    const pacienteRespuesta = response.data;
    return Object.keys(pacienteRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function crearEvento(evento) {
  try {
    const response = await axios.post(rutas.nuevoEvento, evento);

    const eventoRespuesta = response.data;
    return Object.keys(eventoRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function guardarEventoObteniendoIds(Evento) {
  try {
    const pacienteEncontrado = await api.obtenerPacienteByDni(
      Evento.pacienteDni
    );
    Evento.pacienteId = pacienteEncontrado.id;

    const medicoEncontrado = await api.obtenerMedicoByDni(Evento.medicoDni);
    Evento.medicoId = medicoEncontrado.id;

    const response = await axios.post(rutas.nuevoEvento, Evento);

    const eventoRespuesta = response.data;

    return Object.keys(eventoRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// PUT
async function modificarMedico(Medico) {
  try {
    const response = await axios.put(rutas.modificarMedico, Medico);
    const medicoRespuesta = response.data;
    return medicoRespuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function modificarPaciente(id, Paciente) {
  try {
    const response = await axios.put(rutas.modificarPaciente + id, Paciente);

    const pacienteRespuesta = response.data;

    return Object.keys(pacienteRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function modificarEvento(id, Evento) {
  try {
    const response = await axios.put(rutas.modificarEvento + id, Evento);

    const eventoRespuesta = response.data;

    return Object.keys(eventoRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// GET
async function obtenerMedicoByDni(medicoDni) {
  try {
    const medicoEncontrado = await axios.get(rutas.getMedicoByDni + medicoDni);
    return medicoEncontrado.data;
  } catch (error) {
    return "Médico no encontrado";
  }
}

async function obtenerMedicoById(medicoId) {
  try {
    const medicoEncontrado = await axios.get(rutas.getMedicoById + medicoId);
    return medicoEncontrado.data;
  } catch (error) {
    return "Médico no encontrado";
  }
}

async function obtenerPacienteByDni(pacienteDni) {
  try {
    const pacienteEncontrado = await axios.get(
      rutas.getPacienteByDni + pacienteDni
    );
    return pacienteEncontrado.data;
  } catch (error) {
    return "Paciente no encontrado";
  }
}

async function obtenerPacienteById(pacienteId) {
  try {
    const pacienteEncontrado = await axios.get(
      rutas.getPacienteById + pacienteId
    );
    return pacienteEncontrado.data;
  } catch (error) {
    return "Paciente no encontrado";
  }
}

async function obtenerPacientes() {
  try {
    const pacientesObtenidos = await axios.get(rutas.getPacientes);
    pacientesObtenidos.data.reverse();

    return pacientesObtenidos;
  } catch (error) {
    return "No se encontraron pacientes";
  }
}

async function obtenerMedicos() {
  try {
    const usuario = await JSON.parse(
      window.localStorage.getItem("loggedCliniShareAppUser")
    );

    const medicosObtenidos = await axios.get(rutas.getMedicos);
    medicosObtenidos.data = medicosObtenidos.data.filter(
      (medico) => medico.dni !== usuario.medico.dni
    );
    return medicosObtenidos;
  } catch (error) {
    return "No se encontraron médicos";
  }
}

async function obtenerEventoConPacienteYMedicoPorId(id) {
  try {
    const eventoObtenido = await axios.get(
      rutas.getEventoConPacienteYMedicoPorId + id
    );

    return eventoObtenido.data;
  } catch (error) {
    return "El evento no existe";
  }
}

async function obtenerEventos() {
  try {
    const eventosObtenidos = await axios.get(rutas.getEventos);

    return eventosObtenidos;
  } catch (error) {
    return "El evento no existe";
  }
}

async function obtenerEventosCompletos() {
  try {
    const eventosObtenidos = await axios.get(rutas.getEventosCompletos);
    eventosObtenidos.data.sort((a, b) => a.fecha < b.fecha);
    return eventosObtenidos;
  } catch (error) {
    return "Error no hay eventos";
  }
}

async function obtenerEventosPorPacienteId(pacienteId) {
  try {
    const eventosObtenidos = await axios.get(
      rutas.getEventosPorPacienteId + pacienteId
    );
    eventosObtenidos.data.sort((a, b) => a.fecha < b.fecha);

    return eventosObtenidos;
  } catch (error) {
    return "El evento no existe";
  }
}

async function obtenerEventosCompletosPorPacienteId(pacienteId) {
  try {
    const eventosObtenidos = await axios.get(
      rutas.getEventosCompletosPorPacienteId + pacienteId
    );
    eventosObtenidos.data.reverse();

    // eventosObtenidos.data.sort((a, b) => a.fecha < b.fecha);

    return eventosObtenidos;
  } catch (error) {
    return "El evento no existe";
  }
}

async function obtenerEventosCompletosImportantesPorPacienteId(pacienteId) {
  try {
    const eventosImportantesObtenidos = await axios.get(
      rutas.getEventosCompletosImportantesPorPacienteId + pacienteId
    );

    return eventosImportantesObtenidos;
  } catch (error) {
    return "El evento no existe";
  }
}

async function sincronizar() {
  try {
    const response = await axios.post(rutas.postBroadcast);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
}

async function obtenerPacientesConConflictos() {
  try {
    const pacientesConflictivos = await axios.get(
      rutas.getTodosPacientesConConflictos
    );
    return pacientesConflictivos;
  } catch (error) {
    return "No se encontraron pacientes conflictivos";
  }
}

async function obtenerPacienteConflictivo(pacienteDni) {
  try {
    const pacientesConflictivos = await axios.get(
      rutas.getTodosPacientesConConflictos
    );

    const pacienteConflictivo = pacientesConflictivos.data.find(
      (paciente) => paciente.dni === pacienteDni
    );
    return pacienteConflictivo;
  } catch (error) {
    return "Paciente no encontrado";
  }
}

async function resolverConflictos(pacienteParaActualizar) {
  try {
    console.log("API RESOLVER: ", pacienteParaActualizar);
    const response = await axios.post(
      rutas.resolverConflicto,
      pacienteParaActualizar
    );
    console.log(response);
    const pacienteParaActualizarRespuesta = response.data;
    return pacienteParaActualizarRespuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function obtenerEventosPorFechas(fechaInicio, fechaFin, pacienteId) {
  try {
    // console.log("obtenerEventosPorFechas\n");
    // console.log("Paciente: " + pacienteId);

    const fechaInicioAux = convertir(fechaInicio);
    const fechaFinAux = convertir(fechaFin);

    const eventos = await axios.get(
      rutas.getEventosCompletosPorPacienteId + pacienteId
    );

    console.log("TODOS LOS EVENTOS: ", eventos.data);
    const eventosPorFechas = eventos.data.filter(filtrarPorFechas);

    function filtrarPorFechas(evento) {
      evento.fecha = formatearFecha(evento.fecha);
      evento.fecha = convertir(evento.fecha);
      return evento.fecha >= fechaInicioAux && evento.fecha <= fechaFinAux;
    }

    console.log("EVENTOS POR FECHAS: ", eventosPorFechas);
    return eventosPorFechas;
  } catch (error) {}
}

function convertir(fecha) {
  var fechaString = fecha;
  var fechaPartes = fechaString.split("-");

  var fechaDate = new Date(
    +fechaPartes[2],
    fechaPartes[1] - 1,
    +fechaPartes[0]
  );

  return fechaDate;
}

const formatearFecha = (fechaDeEvento) => {
  let fecha = new Date(fechaDeEvento);
  let dia = `${fecha.getDate()}`.padStart(2, "0");
  let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
  let anio = fecha.getFullYear();
  const fechaFormateada = `${dia}-${mes}-${anio}`;
  return fechaFormateada;
};
