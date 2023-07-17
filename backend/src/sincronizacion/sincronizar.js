import { SERVER_BD_PORT } from "../UDP/constants.js";
import { PacientesService } from "../services/paciente.service.js";
import emitter from "../eventos/eventEmitter.js";
import { getComputadora } from "../UDP/constants.js";
import { SincronizacionService } from "../services/sincronizacion.service.js";
import { ComputadoraLocalService } from "../services/computadoraLocal.service.js";


import { utils } from "../encripcion/utils.js";
const cryptoData = await ComputadoraLocalService.getKeysAndCertPEM();
const axios = await utils.getAxiosInstance(cryptoData.privateKey,cryptoData.certificateSigned);

export async function sincronizar(computadora) {
  // console.log("\n\nsincronizando looping \n\n");

  const fechaUltimaSincronizacion = await SincronizacionService.getUltimaFechaDeSincronizacionConComputadoraId(computadora.computadoraId);

  const computadoraLocal = await getComputadora();

  const postSincronicemosString =
    "http://" +
    computadora.ip.toString().trim() +
    ":" +
    SERVER_BD_PORT.toString().trim() +
    "/sincronizar";

  const getDNISyNacimientosString =
    "http://" +
    computadora.ip.toString().trim() +
    ":" +
    SERVER_BD_PORT.toString().trim() +
    "/pacientes/all/dnis;nacimientos";


  // console.log("\n\nevento: antes de hacer get dnis\n\n");
  //obtener DNIS para sincronizar con los que tenemos en comun
  let dnisyNacimientosDePacientes = [];
  await axios
    .get(getDNISyNacimientosString)
    .then((res) => {
      if (res.data.count === 0) {
        //si no tiene pacientes no hay nada que hacer
        return; //chau chau adios
      }

      dnisyNacimientosDePacientes = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  let dnisyFechasASincronizar =
    await PacientesService.getInterseccionDNISyFechas(
      dnisyNacimientosDePacientes
    );

  //obtener los datos a sincronizar

  // console.log("\n\nevento: antes de hacer post\n\n");

  await axios
    .post(postSincronicemosString, {
      fecha:fechaUltimaSincronizacion,
      computadora:computadoraLocal,
      dnisyFechasASincronizar,
    })
    .then((res) => {

      
      if (!res.data) {
        return; //chau chau adios
      }

      let datosPacientes = res.data;

      // hacemosAlgo
      emitter.emit("datos_recibidos", {datosPacientes,computadora});
    })
    .catch((error) => {
      console.error(error);
    });
}


export async function sincronizarNonLooping(computadora) {

  const fechaUltimaSincronizacion = await SincronizacionService.getUltimaFechaDeSincronizacionConComputadoraId(computadora.computadoraId);
  const computadoraLocal = await getComputadora();
  
  const postSincronicemosString =
    "http://" +
    computadora.ip.toString().trim() +
    ":" +
    SERVER_BD_PORT.toString().trim() +
    "/sincronizar";

  const getDNISyNacimientosString =
    "http://" +
    computadora.ip.toString().trim() +
    ":" +
    SERVER_BD_PORT.toString().trim() +
    "/pacientes/all/dnis;nacimientos";

  //obtener DNIS para sincronizar con los que tenemos en comun
  let dnisyNacimientosDePacientes = [];
  await axios
    .get(getDNISyNacimientosString)
    .then((res) => {
      if (!res.data.count === 0) {
        //si no tiene pacientes no hay nada que hacer
        return; //chau chau adios
      }

      dnisyNacimientosDePacientes = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  let dnisyFechasASincronizar =
    await PacientesService.getInterseccionDNISyFechas(
      dnisyNacimientosDePacientes
    );

  //obtener los datos a sincronizar
  await axios
    .post(postSincronicemosString, {
      fecha:fechaUltimaSincronizacion,
      computadora: computadoraLocal,
      dnisyFechasASincronizar,
    })
    .then((res) => {
      if (!res.data) {
        return; //chau chau adios
      }


      let datosPacientes = res.data;

      // hacemosAlgo
      emitter.emit("datos_recibidos_non_looping", {datosPacientes,computadora});
    })
    .catch((error) => {
      console.error(error);
    });
}

