import {eventos1} from "./eventos_1.js";
import {eventos2} from "./eventos_2.js";
import {eventos3} from "./eventos_3.js";
import {medicos} from "./medicos.js";
import {pacientes} from "./pacientes.js";
import fs from "fs";

const pacientesIds = pacientes.map((p)=>p.id);
const medicosIds = medicos.map((p)=>p.id);

async function procesarDatos(){

    const eventos1Procesados = filtrarEventos(eventos1);
    const eventos2Procesados = filtrarEventos(eventos2);
    const eventos3Procesados = filtrarEventos(eventos3);

    const eventosProcesados = {eventos1Procesados,eventos2Procesados,eventos3Procesados};

    for(const key of Object.keys(eventosProcesados)){
        fs.writeFileSync("./" + key + ".js", "export const eventos = "+ JSON.stringify(eventosProcesados[key],null,4));
    }

}

function filtrarEventos(eventos){
    for(const evento of eventos){
        const randomMedicoId = medicosIds[randomIndex(medicosIds)];
        const randomPacienteId = pacientesIds[randomIndex(pacientesIds)];

        // generar id medico e id paciente

        evento.medicoId = randomMedicoId;
        evento.pacienteId = randomPacienteId;        
    }

    return eventos;
}

function randomIndex(arr){
    return Math.floor(Math.random() * arr.length);
}

procesarDatos();