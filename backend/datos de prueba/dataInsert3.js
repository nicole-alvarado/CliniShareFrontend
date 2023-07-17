
import {eventos} from "./eventos3Procesados.js";
import {medicos} from "./medicos.js";
import {pacientes} from "./pacientes.js";

import { insertarDatos } from "./insertarDatos.js";

export const dataInsert3 = async () => {await insertarDatos(eventos,medicos,pacientes)};