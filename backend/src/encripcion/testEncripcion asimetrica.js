import crypto from "crypto";

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key
const coso0 = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "top secret",
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
});

const coso1 = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "top secret",
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
});

export function encryptText(plainText, key) {
  return crypto.publicEncrypt(
    {
      format: "pem",
      key,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer
    Buffer.from(plainText)
  );
}

export function decryptText(encryptedText, key) {
  return crypto.privateDecrypt(
    {
      format: "pem",
      key,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedText
  );
}

console.log("\n\n\n");
console.log("publicKey0", JSON.stringify(coso0.publicKey));
console.log("\n\n\n");
console.log("privateKey0", JSON.stringify(coso0.privateKey));
console.log("\n\n\n");

console.log("\n\n\n");
console.log("publicKey1", JSON.stringify(coso1.publicKey));
console.log("\n\n\n");
console.log("privateKey1", JSON.stringify(coso1.privateKey));
console.log("\n\n\n");

console.log(
  "iguales: ",
  JSON.stringify(coso0.publicKey) === JSON.stringify(coso1.publicKey)
);
console.log(
  "iguales: ",
  JSON.stringify(coso0.privateKey) === JSON.stringify(coso1.privateKey)
);


const textoEncriptado = encryptText("hola",coso0.publicKey);
console.log(textoEncriptado);
console.log(decryptText(textoEncriptado,coso0.privateKey));