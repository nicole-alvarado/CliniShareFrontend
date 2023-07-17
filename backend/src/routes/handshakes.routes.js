import { Router } from "express";
import { getInitialResponse } from "../sincronizacion/handshake.js";
import { handleSincronizarPostRequest } from "../sincronizacion/datosPacientes.js";
import emitter from "../eventos/eventEmitter.js";
import {  getDnisYNacimientosDePacientes
} from "../controllers/paciente.controller.js";

const router = Router();

router.get("/clinishare", (req, res) =>
res.send(JSON.stringify(getInitialResponse()))
);
router.post("/sincronizar", async (req, res, next) => {
  await handleSincronizarPostRequest(req, res, next);
  emitter.emit("datos_enviados",req.body);
});

router.post("/broadcast", async (req,res,next) => {
  emitter.emit("broadcast_to_network");
  res.send(true);
})

router.get("/pacientes/all/dnis;nacimientos", getDnisYNacimientosDePacientes);


export default router;
