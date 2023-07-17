import { TokenUsuarioService } from "../services/tokenUsuario.service.js";
import { userService } from "../services/user.service.js";

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const userController = {
  registerUser,
  loginUser,
  modifyUser,
  validateToken,
};

async function registerUser(req, res, next) {
  const credentials = req.body;
  const response = await userService.register(credentials);

  res.send(JSON.stringify(response));
}

async function loginUser(req, res, next) {
  const datosLogin = req.body;

  const response = await userService.login(
    datosLogin.email,
    datosLogin.password
  );

  res.send(JSON.stringify(response));

  if (response.token) {
    return true;
  } else {
    return false;
  }
}

async function modifyUser(req, res, next) {
  const user = req.body;
  const response = await userService.modify(user);

  res.send(JSON.stringify(response));
}

async function validateToken(req, res, next) {
  const id = req.params.id;
  const token = {id};
  const response = await TokenUsuarioService.validarTokenYUsuario(token);
  
  if(response){
    res.sendFile(path.join(__dirname,"../email/response.OK.html"));
  }else{
    res.sendFile(path.join(__dirname,"../email/response.NOTOK.html"));
  }

}
