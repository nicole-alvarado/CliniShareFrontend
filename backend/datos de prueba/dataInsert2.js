
import {eventos} from "./eventos2Procesados.js";
import {medicos} from "./medicos.js";
import {pacientes} from "./pacientes.js";

import { insertarDatos } from "./insertarDatos.js";

export const dataInsert2 = async () => {await insertarDatos(eventos,medicos,pacientes)};