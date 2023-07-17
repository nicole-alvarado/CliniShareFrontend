
import { SERVER_BD_PORT, INITIAL_RESPONSE } from "../UDP/constants.js";
import emitter from "../eventos/eventEmitter.js";

import { utils } from "../encripcion/utils.js";
import ComputadoraLocalService from "../services/computadoraLocal.service.js";

const cryptoData = await ComputadoraLocalService.getKeysAndCertPEM();
const axios = utils.getAxiosInstance(cryptoData.privateKey,cryptoData.certificateSigned);

export function handleNewComputer(computadora) {
  for (let ip in computadora.IPS) {
    const getMethodString =
      "https://" +
      computadora.IPS[ip].toString().trim() +
      ":" +
      SERVER_BD_PORT.toString().trim() +
      "/clinishare";

      axios
      .get(getMethodString)
      .then((res) => {
        if (res.data.INITIAL_RESPONSE === INITIAL_RESPONSE) {
          emitter.emit(
            "new_valid_computer",
            getComputadoraConIPReal(computadora, ip)
          );
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function handleNewComputerNonLooping(computadora) {
  for (let ip in computadora.IPS) {
    const getMethodString =
      "https://" +
      computadora.IPS[ip].toString().trim() +
      ":" +
      SERVER_BD_PORT.toString().trim() +
      "/clinishare";

    axios
      .get(getMethodString)
      .then((res) => {
        if (res.data.INITIAL_RESPONSE === INITIAL_RESPONSE) {
          // hacemosAlgo
          emitter.emit(
            "new_valid_computer_non_looping",
            getComputadoraConIPReal(computadora, ip)
          );
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function getInitialResponse(req, res) {
  return { INITIAL_RESPONSE: INITIAL_RESPONSE };
}

function getComputadoraConIPReal(comp, ip) {
  const ipReal = comp.IPS[ip];
  delete comp.IPS;
  comp.ip = ipReal;

  return comp;
}
