import forge from "node-forge";
import https from "https";
import axios from "axios";

const pki = forge.pki;

export const utils = {
  generateRSAKeyPair,
  generateAndSelfSignCert,
  generateRSAKeyPairAndSelfSignedCertTOPEM,
  createHTTPSserver,
  getAxiosInstance,
};


function generateRSAKeyPair() {
  return pki.rsa.generateKeyPair(2048);
}

function generateRSAKeyPairAndSelfSignedCertTOPEM() {
  const keys = pki.rsa.generateKeyPair(2048);
  const keysToPem = {
    privateKey: pki.privateKeyToPem(keys.privateKey),
    publicKey: pki.publicKeyToPem(keys.publicKey),
  };

  const cert = generateAndSelfSignCert(keys);
  const certToPem = pki.certificateToPem(cert);

  return { keys: keysToPem, cert: certToPem };
}

function generateAndSelfSignCert(keys) {
  // create a new certificate
  const cert = pki.createCertificate();

  // fill the required fields
  cert.publicKey = keys.publicKey;
  cert.serialNumber = "01";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(
    cert.validity.notBefore.getFullYear() + 30
  );

  // use your own attributes here, or supply a csr (check the docs)
  const attrs = [
    {
      name: "commonName",
      value: "clinishare",
    },
    {
      name: "countryName",
      value: "ARG",
    },
    {
      shortName: "ST",
      value: "Chubut",
    },
    {
      name: "localityName",
      value: "-",
    },
    {
      name: "organizationName",
      value: "CliniShare",
    },
    {
      shortName: "OU",
      value: "Testing",
    },
  ];

  // here we set subject and issuer as the same one
  cert.setSubject(attrs);
  cert.setIssuer(attrs);

  // the actual certificate signing
  cert.sign(keys.privateKey);

  // now convert the Forge certificate to PEM format
  return cert;
}

function createHTTPSserver(key, cert, app) {
  const sslServer = https.createServer(
    {
      requestCert: false,
      rejectUnauthorized: false,
      key,
      cert,
    },
    app
  );

  return sslServer;
}

function getAxiosInstance(key, cert) {
  const httpsAgent = new https.Agent({
    requestCert: false,
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
    key,
    cert
  });

  const instance = axios.create({
    httpsAgent: httpsAgent,
  });

  return instance
}
