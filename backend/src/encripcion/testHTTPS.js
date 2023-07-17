import https from "https";
import express from "express";

import { utils } from "./utils.js";

import {comprobarTest} from "../routes/comprobadorToken.js";

import forge from "node-forge";

const pki = forge.pki;

const keys = utils.generateRSAKeyPair();
const cert = utils.generateAndSelfSignCert(keys);

const app = express();


app.get("/bad", (req, res, next) => {
  res.send("bad");
});

app.use(comprobarTest);

app.get("/good", (req, res, next) => {
  res.send("good");
});

const sslServer = https.createServer(
  {
    requestCert: true,
    rejectUnauthorized: false,
    key: pki.privateKeyToPem(keys.privateKey),
    cert: pki.certificateToPem(cert),
  },
  app
);

sslServer.listen(3000, () => console.log("secure server runin"));
