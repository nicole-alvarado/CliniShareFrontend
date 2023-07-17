import { Sincronizacion } from "../models/Sincronizacion.js";

export const SincronizacionService = {
  getSincronizacionReciente:  getSincronizacionMasRecientePorComputadoraId,
  createSincronizacion: (sincronizacion) =>
    createSincronizacionFromModel(sincronizacion),
  registrarSincronizacion,
  getUltimaFechaDeSincronizacionConComputadoraId,
};

async function registrarSincronizacion(computadoraId) {
  const sincronizacionNueva = { computadoraId };
  await createSincronizacionFromModel(sincronizacionNueva);
}

async function getSincronizacionMasRecientePorComputadoraId(computadoraId) {
  const fechasDeSincronizaciones = await Sincronizacion.findAll({
    attributes: ["fecha"],
    where:{computadoraId:computadoraId}
  });
  

  if(fechasDeSincronizaciones.length === 0){
    return false
  }

  //obtener fecha mas reciente
  let arrayFechas = fechasDeSincronizaciones.map(
    (fechaActual) => new Date(fechaActual.fecha)
  );



  var maxFecha = new Date(Math.max(...arrayFechas));

  const sincronizacion = await Sincronizacion.findOne({
    where: {
      fecha: maxFecha,
      computadoraId
    },
  });

  if (!sincronizacion) {
    return {};
  } else {
    return sincronizacion;
  }
}

async function getUltimaFechaDeSincronizacionConComputadoraId(computadoraId) {
    const fechasDeSincronizaciones = await Sincronizacion.findAll({
      attributes: ["fecha"],
      where:{computadoraId:computadoraId}
    });
    
  
    if(fechasDeSincronizaciones.length === 0){
      return false
    }
  
    //obtener fecha mas reciente
    let arrayFechas = fechasDeSincronizaciones.map(
      (fechaActual) => new Date(fechaActual.fecha)
    );
  
    const maxFecha = new Date(Math.max(...arrayFechas));

    return maxFecha;

}


async function createSincronizacionFromModel(sincronizacion) {
  try {
    const fecha = new Date();
    const newSincronizacion = await Sincronizacion.create({
      ...sincronizacion,
      fecha,
    });

    return newSincronizacion;
  } catch (error) {
    console.log("Error en la creación de sincronización" + error);
  }
}
