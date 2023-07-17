import { EventosService } from "../services/eventos.service.js";
import { PacientesService } from "../services/paciente.service.js";
import { sequelize } from "../database/database.js";
import { Medico } from "../models/Medico.js";
import { Evento } from "../models/Evento.js";
import { PacientesConflictivosService } from "../services/pacienteConflictivo.service.js";

export async function handleSincronizarPostRequest(req, res, next) {
  res.send(
    await getDatosParaSincronizar(
      req.body.fecha,
      req.body.dnisyFechasASincronizar,
      req.body.computadora
    )
  );
}

export async function getDatosParaSincronizar(fecha, dnisYFechas, computadora) {
  let eventos = [];
  if (Object.keys(fecha).length === 0) {
    //primera sincronizacion
    eventos = await EventosService.getEventosCompletosPorDnisYFechas(
      dnisYFechas
    );
  } else {
    eventos =
      await EventosService.getEventosCompletosPorDnisYFechasAPartirDeFecha(
        dnisYFechas,
        fecha
      );
  }
  //filtramos por los medicos que tiene la maquina, los datos fluyen en una sola direccion
  const eventosFiltrados = EventosService.excluirPorIdsMedicos(
    eventos,
    computadora.medicosIds
  );

  const eventosDesarmados = EventosService.desarmarEventos(eventosFiltrados);

  return eventosDesarmados;
}

export async function actualizarDatos(datos,computadoraId) {

  if (Object.keys(datos).length === 0) {
    return;
  }
  if(datos.pacientes.length === 0 || datos.medicos.length === 0 || datos.eventos.length === 0){
    return;
  }

  datos.eventos = await actualizarIdsPacientes(datos);
  
  
  try {
    await sequelize.transaction(async (t) => {
      for (const medico of datos.medicos) {
        await Medico.upsert(medico, { transaction: t });
      }
      
      
      for (const evento of datos.eventos) {
        await Evento.upsert(evento, { transaction: t });
      }
      
    });
    
    await PacientesConflictivosService.apartarConflictos(datos.pacientes, computadoraId);
    
    return true;
  } catch (error) {
    console.log("No se pudo actualizar el evento compartido: " + error);
    return {};
  }
}

async function actualizarIdsPacientes(datos) {

  for (const pacienteViejo of datos.pacientes) {
 
    //buscamos el evento que tenga el pacienteId del viejo y lo cambiamos
    for(let i = 0; i<datos.eventos.length;i++){

      if(JSON.stringify(datos.eventos[i].pacienteId) === JSON.stringify(pacienteViejo.id)){
        datos.eventos[i].pacienteId =  await PacientesService.getIdPorDniYNacimiento(pacienteViejo);
      }
    }
  }

  return datos.eventos;
}
