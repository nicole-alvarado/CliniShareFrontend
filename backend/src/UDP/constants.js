import ipsGetter from "./getIp.js";
import { ComputadoraLocalService } from "../services/computadoraLocal.service.js";
import { userService } from "../services/user.service.js";

export const SERVER_PORT = 10000;
export const MAGIC_STRING = "ALWAYS100";
export const SERVER_BD_PORT = 3000;
export const INITIAL_RESPONSE = "HOLA";
export const REACT_SERVER_BD_PORT = 5000;
export const VERIF_SERVER_BD_PORT = 3001;

export const getComputadora = async () => {
  const computadora = await ComputadoraLocalService.getComputadoraLocal();
  const medicosIds = await userService.getAllMedicosUUIDSDeUsers();
  return {
    nombre: computadora.nombre,
    IPS: ipsGetter(),
    MAGIC_STRING: MAGIC_STRING,
    computadoraId: computadora.id,
    medicosIds
  };
};
