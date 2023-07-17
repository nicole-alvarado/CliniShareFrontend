const puertoServidorBackend = 3000;

const rutas = {
  nuevoMedicoUsuario: "register",
  LoginMedicoUsuario: "login",

  nuevoMedico: "medicos/new",
  nuevoPaciente: "pacientes/new",
  nuevoEvento: "eventos/new",

  modificarMedico: "modify",
  modificarPaciente: "pacientes/id/",
  modificarEvento: "eventos/id/",

  getMedicoByDni: "medicos/dni/",
  getMedicoById: "medicos/id/",
  getMedicos: "medicos/all/",
  getPaciente: "pacientes/id/",
  getPacienteByDni: "pacientes/dni/",
  getPacienteById: "pacientes/id/",
  getPacientes: "pacientes/all",
  getEventoConPacienteYMedicoPorId: "eventos/completo/id/",
  getEventos: "eventos/all",
  getEventosCompletos: "eventos/all/completos",
  getEventosPorPacienteId: "eventos/paciente/id/",
  getEventosCompletosPorPacienteId: "eventos/all/completos/idPaciente/",
  getEventosCompletosImportantesPorPacienteId:
    "eventos/importantes/paciente/id/",
  postBroadcast: "broadcast",
  getPacientesYConflictos: "conflictos/includePacientes/all/",
  getTodosPacientesConConflictos: "conflictos/all/",
  resolverConflicto: "conflictos/resolver",

};

for (let ruta in rutas) {
  rutas[ruta] = "http://localhost:" + puertoServidorBackend + "/" + rutas[ruta];
}

export default rutas;
