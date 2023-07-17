import { EventosService } from "../services/eventos.service.js";

export const getEventos = async (req, res, next) => {
  const eventos = await EventosService.getEventos();
  res.send(JSON.stringify(eventos));
};


export const getEventosCompletos = async (req, res, next) => {
  const eventos = await EventosService.getEventosCompletos();
  res.send(JSON.stringify(eventos));
};


export const getEventosCompletosPorIdPaciente = async (req, res, next) => {
  const eventos = await EventosService.getEventosCompletosPorIDPaciente(req.params.idPaciente);
  res.send(JSON.stringify(eventos));
};


export const getEventosPorDni = async (req, res, next) => {
  let dni = req.params.dni;
  const eventos = await EventosService.getEventosPorDniPaciente(dni);
  res.send(JSON.stringify(eventos));
};

export const getEventosPorPacienteId = async (req, res, next) => {
  let id = req.params.id;
  const eventos = await EventosService.getEventosPorPacienteId(id);
  res.send(JSON.stringify(eventos));
};

export const getEventoPorId = async (req, res, next) => {
  let id = req.params.id;
  const evento = await EventosService.getEventoPorId(id);

  res.send(JSON.stringify(evento));
};

export const getEventoConPacienteYMedicoPorId = async (req, res, next) => {
  let id = req.params.id;
  const evento = await EventosService.getEventoConPacienteYMedicoPorId(id);

  res.send(JSON.stringify(evento));
};

export const getEventosCompletosImportantesPorPacienteId = async (req, res, next) => {
  let id = req.params.id;
  const eventos = await EventosService.getEventosCompletosImportantesPorPacienteId(id);
  res.send(JSON.stringify(eventos));
}

export const getEventoImportanteCompletoPorId= async (req, res, next) => {
  let id = req.params.id;
  const evento = await EventosService.getEventoImportanteCompletoPorId(id);

  res.send(JSON.stringify(evento));
};

export const createEvento = async (req, res, next) => {
  try {
    const evento = req.body;
    const eventoCargado = await EventosService.createEvento(evento);
    res.send(JSON.stringify(eventoCargado));
  } catch (error) {
    console.log(error);
  }
};

export const updateEventoPorId = async (req, res, next) => {
  const id = req.params.id;
  const evento = req.body;
  const updatedEvento = await EventosService.updateEventoPorId(evento, id);

  res.send(JSON.stringify(updatedEvento));
};
