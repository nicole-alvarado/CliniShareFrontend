import { MedicosService } from "../services/medico.service.js";

export const getMedicos = async (req, res, next) => {
  const medicos = await MedicosService.getMedicos();
  res.send(JSON.stringify(medicos));
};

export const createMedico = async (req, res, next) => {
  const medico = req.body;
  const medicoCreado = await MedicosService.createMedico(medico);

  res.send(JSON.stringify(medicoCreado));
};

export const getMedicoByDni = async (req, res, next) => {
  let dniABuscar = req.params.dni;

  const medicoEncontrado = await MedicosService.getMedicoByDni(
    dniABuscar
  );
  res.send(JSON.stringify(medicoEncontrado));
};

export const getMedicoById = async (req, res, next) => {
  let id = req.params.id;
  
  const medicoEncontrado = await MedicosService.getMedicoById(id);
  res.send(JSON.stringify(medicoEncontrado));
};
