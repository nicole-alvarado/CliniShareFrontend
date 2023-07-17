import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ComputadoraLocalService } from "./services/computadoraLocal.service.js";
import { utils } from "./encripcion/utils.js";
import { REACT_SERVER_BD_PORT } from "./UDP/constants.js";
const cryptoData = await ComputadoraLocalService.getKeysAndCertPEM();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../../frontend/build')));


//middlewares
app.use(express.json());

const server = utils.createHTTPSserver(
  cryptoData.privateKey,
  cryptoData.certificateSigned,
  app
);

server.listen(REACT_SERVER_BD_PORT, () => {
  console.log("React server is listening on port", REACT_SERVER_BD_PORT);
})
