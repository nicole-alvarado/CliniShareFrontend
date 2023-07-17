import axios from "axios";
import https from "https";
import forge from "node-forge";
import { utils } from "./utils.js";

const pki = forge.pki;

const keys = utils.generateRSAKeyPair();
const cert = utils.generateAndSelfSignCert(keys);

const httpsAgent = new https.Agent({
  requestCert: true,
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  key: pki.privateKeyToPem(keys.privateKey),
  cert: pki.certificateToPem(cert),
});

const instance = axios.create({
  httpsAgent: httpsAgent,
});

instance.interceptors.request.use(
  (config) => {
    /** In dev, intercepts request and logs it into console for dev */

    config.headers["token"] = "l";

    // console.info("✉️ ", Object.keys());
    return config;
  },
  (error) => {
    console.error("✉️ ", error);
    return Promise.reject(error);
  }
);

let response = await instance.get("https://localhost:3000/bad");
console.log(response.data);

response = await instance.get("https://localhost:3000/good");
console.log(response.data);
