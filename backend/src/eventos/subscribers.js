import {
  handleNewComputer,
  handleNewComputerNonLooping,
} from "../sincronizacion/handshake.js";
import {
  sincronizar,
  sincronizarNonLooping,
} from "../sincronizacion/sincronizar.js";
import { SincronizacionService } from "../services/sincronizacion.service.js";
import { actualizarDatos } from "../sincronizacion/datosPacientes.js";
import { listenForBroadcasts } from "../UDP/broadcastListener.js";
import {
  broadcastComputerData,
  responderBroadcast,
} from "../UDP/broadcastSender.js";
import { ComputadoraService } from "../services/computadora.service.js";

import { dataInsert1 } from "../../datos de prueba/dataInsert1.js";
import { dataInsert2 } from "../../datos de prueba/dataInsert2.js";
import { dataInsert3 } from "../../datos de prueba/dataInsert3.js";

// Import other listeners
export default function loadListeners(emitter) {
  emitter.on("db_connected", async () => {
    const treintaMinutos = 1000 * 60 * 30;

    if (process.env.TESTING) {
      switch (process.env.TESTING_DATA) {
        case "1":
          await dataInsert1();
          break;
        case "2":
          await dataInsert2();
          break;

        case "3":
          await dataInsert3();
          break;

        default:
          break;
      }
    }

    //starting broadcast listener
    listenForBroadcasts();

    //broadcast self to network after a few seconds
    setTimeout(broadcastComputerData, 1000);
    setInterval(broadcastComputerData, treintaMinutos);
  });

  emitter.on("logged_in", () => {});

  emitter.on("broadcast_to_network", () => {
    broadcastComputerData();
  });

  emitter.on("new_computer", (computer) => {
    // console.log("\n\nevento:new_computer\n\n");
    handleNewComputer(computer);
  });

  emitter.on("new_computer_non_looping", (computer) => {
    // console.log("\n\nnew_computer_non_looping\n\n");
    handleNewComputerNonLooping(computer);
  });

  emitter.on("new_valid_computer", async (computer) => {
    // console.log("\n\nnew_valid_computer\n\n");
    await ComputadoraService.upsertarComputadora(computer);
    await sincronizar(computer);
  });

  emitter.on("new_valid_computer_non_looping", async (computer) => {
    // console.log("\n\nevento:new_valid_computer_non_looping\n\n", computer);
    await ComputadoraService.upsertarComputadora(computer);
    await sincronizarNonLooping(computer);
  });

  emitter.on("datos_enviados", async (obj) => {});

  emitter.on("datos_recibidos", async (obj) => {
    // console.log("\n\nevento:datos_recibidos\n\n", obj);

    await actualizarDatos(obj.datosPacientes,obj.computadora.computadoraId);
    SincronizacionService.registrarSincronizacion(
      obj.computadora.computadoraId
    );

    // console.log("\n\n evento: ya se actualizaron los datos \n\n");

    await responderBroadcast(obj.computadora);
  });

  emitter.on("datos_recibidos_non_looping", async (obj) => {
    // console.log(
    //   "\n\nevento:datos_recibidos_non_looping\n\n",
    //   obj.datosPacientes
    // );

    await actualizarDatos(obj.datosPacientes,obj.computadora.computadoraId);
    SincronizacionService.registrarSincronizacion(
      obj.computadora.computadoraId
    );
  });

  // Attach other events
  return emitter;
}
