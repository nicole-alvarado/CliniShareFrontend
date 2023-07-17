import { sesionActivaService } from "../services/sesionActiva.service.js";
import { userService } from "../services/user.service.js";

const comprobarToken = async (req, res, next) => {

  if(req.url === "/favicon.ico"){
    next();
    return;
  }

  const token = req.headers["token"];
  const verificado = await sesionActivaService.comprobarToken(token);

  if (verificado === true) {
      next();

} else {
    res.status(401).json({ error: "Unauthorized: Token inválido ;^)" });
  }
};

export default comprobarToken;
