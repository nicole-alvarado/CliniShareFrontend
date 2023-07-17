import { Paciente } from "../src/models/Paciente.js";
import { Medico } from "../src/models/Medico.js";
import { Evento } from "../src/models/Evento.js";

export async function insertarDatos(eventos,medicos,pacientes){

    for(const paciente of pacientes){
        // insertarPaciente
        await Paciente.upsert(paciente);
    }

    for(const medico of medicos){
        // insertarMedico
        await Medico.upsert(medico);
    }

    for(const evento of eventos){
        // insertarEvento
        await Evento.upsert(evento);
    }

}


