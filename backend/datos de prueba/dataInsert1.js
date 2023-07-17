
import {eventos} from "./eventos1Procesados.js";
import {medicos} from "./medicos.js";
import {pacientes} from "./pacientes.js";

import { insertarDatos } from "./insertarDatos.js";

export const dataInsert1 = async () => {await insertarDatos(eventos,medicos,pacientes)};