import { ComputadoraLocal } from "../models/ComputadoraLocal.js";

import os from "os";
import { utils } from "../encripcion/utils.js";

export const ComputadoraLocalService = {
  obtenerUUIDActual,
  getComputadoraLocal,
  getKeysAndCertPEM
};

export default ComputadoraLocalService;

async function obtenerUUIDActual() {
  try {
    const computadoraLocal = await ComputadoraLocal.findOne();

    if (computadoraLocal) {
      return computadoraLocal.dataValues.id;
    } else {
      const computadoraNueva = await crearComputadoraLocalDefault();
      return computadoraNueva.dataValues.id;
    }
  } catch (error) {
    console.log("No se pudo encontrar computadoraLocal, error: " + error);
    return {};
  }
}

async function getKeysAndCertPEM() {
  try {
    const computadoraLocal = await ComputadoraLocal.findOne();

    if (computadoraLocal) {
      const dataVals = computadoraLocal.dataValues;
      return {
        publicKey: dataVals.publicKey,
        privateKey: dataVals.privateKey,
        certificateSigned: dataVals.certificateSigned,
      };
    } else {
      const computadoraNueva = await crearComputadoraLocalDefault();
      const dataVals = computadoraNueva.dataValues;
      return {
        publicKey: dataVals.publicKey,
        privateKey: dataVals.privateKey,
        certificateSigned: dataVals.certificateSigned,
      };
    }
  } catch (error) {
    console.log("No se pudo encontrar computadoraLocal, error: " + error);
    return {};
  }
}

async function getComputadoraLocal() {
  try {
    const computadoraLocal = await ComputadoraLocal.findOne();

    if (computadoraLocal) {
      return {
        id: computadoraLocal.dataValues.id,
        nombre: computadoraLocal.dataValues.nombre,
      };
    } else {
      const computadoraNueva = await crearComputadoraLocalDefault();
      return {
        id: computadoraNueva.dataValues.id,
        nombre: computadoraNueva.dataValues.nombre,
      };
    }
  } catch (error) {
    console.log("No se pudo encontrar computadoraLocal, error: " + error);
    return {};
  }
}

async function crearComputadoraLocalDefault() {
  try {
    const keysAndCert = utils.generateRSAKeyPairAndSelfSignedCertTOPEM();

    const computadoraNueva = await ComputadoraLocal.create({
      nombre: os.hostname(),
      publicKey: keysAndCert.keys.publicKey,
      privateKey: keysAndCert.keys.privateKey,
      certificateSigned: keysAndCert.cert,
    });

    return { id: computadoraNueva.id, nombre: computadoraNueva.nombre };
  } catch (error) {
    console.log(error);
    return {};
  }
}
