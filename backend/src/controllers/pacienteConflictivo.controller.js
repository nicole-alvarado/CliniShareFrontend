import { PacientesConflictivosService } from "../services/pacienteConflictivo.service.js";

export const getAll = async (req, res, next) => {
  const pacientes = await PacientesConflictivosService.getAll();
  res.send(JSON.stringify(pacientes));
};

export const resolver = async (req, res, next) => {
  const response = await PacientesConflictivosService.resolver(req.body);
  res.send(JSON.stringify(response));
}

export const getPacientesYConflictos = async(req,res,next) => {
  const response = await PacientesConflictivosService.getPacientesYConflictos();
  res.send(JSON.stringify(response));
}

