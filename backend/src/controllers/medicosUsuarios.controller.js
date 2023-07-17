import { MedicosUsuariosService } from "../services/medicoUsuario.service.js";

export const getMedicos = async (req, res, next) => {
  const medicos = await MedicosUsuariosService.getMedicos();
  res.send(JSON.stringify(medicos));
};


export const getMedicoByDni = async (req, res, next) => {
  let dniABuscar = req.params.dni;
  const medicoEncontrado = await MedicosUsuariosService.getMedicoByDni(
    dniABuscar
  );
  res.send(JSON.stringify(medicoEncontrado));
};

export const getMedicoById = async (req, res, next) => {
  let id = req.params.id;
  const medicoEncontrado = await MedicosUsuariosService.getMedicoById(id);
  res.send(JSON.stringify(medicoEncontrado));
};
