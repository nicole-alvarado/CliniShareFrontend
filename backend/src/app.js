import express from "express";
import userRoutes from "./routes/user.routes.js";
import comprobarToken from "./routes/comprobadorToken.js";
import medicosRoutes from "./routes/medicos.routes.js";
import handshakeRoutes from "./routes/handshakes.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";
import conflictosRoutes from "./routes/conflictos.routes.js";
import cors from "cors";

import { ComputadoraLocalService } from "./services/computadoraLocal.service.js";
import { utils } from "./encripcion/utils.js";
const cryptoData = await ComputadoraLocalService.getKeysAndCertPEM();

const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(handshakeRoutes);
app.use(userRoutes);

app.use(comprobarToken); //solo se comprueba el token en las solicitudes que no sean de usuario ni de sincronizar: 
//no login, no register, etc. ya que el usuario no tendría el token en esas requests.

app.use(medicosRoutes);
app.use(pacientesRoutes);
app.use(eventosRoutes);
app.use(conflictosRoutes);

const server = utils.createHTTPSserver(
  cryptoData.privateKey,
  cryptoData.certificateSigned,
  app
);

export default server;
