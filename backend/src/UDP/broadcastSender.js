
import dgram from "dgram";
import { SERVER_PORT,  } from "./constants.js";
import { getComputadora } from "./constants.js";



function broadcastMessage(myMessage) {
  var sender = dgram.createSocket("udp4");

  sender.bind(undefined, undefined, function () {
    sender.setBroadcast(true);
  });

  sender.send(
    myMessage,
    0,
    myMessage.length,
    SERVER_PORT,
    "255.255.255.255",
    function (err, bytes) {
      sender.close();
    }
  );
}

export async function broadcastComputerData() {
  const computadora = await getComputadora();
  // broadcasts the computer data to the network
  broadcastMessage(JSON.stringify(computadora));
}

export async function responderBroadcast(computer) {
  // enviamos nuestros datos (nombre, ips, etc.) a la computadora que nos envió un broadcast

  // console.log("\n\n respondiendo broadcast \n\n",computer);

  var sender = dgram.createSocket("udp4");
  const computadoraLocal = await getComputadora();

  let mensajeComputadora = JSON.stringify(computadoraLocal);

  sender.bind(undefined, undefined);

  sender.send(
    mensajeComputadora,
    0,
    mensajeComputadora.length,
    SERVER_PORT,
    computer.ip[0],
    function (err, bytes) {
      sender.close();
    }
  );
}

