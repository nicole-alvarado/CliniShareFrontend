import app from "./app.js";
import verifServer from "./verifServer.js";

import { sequelize } from "./database/database.js";
import { SERVER_BD_PORT,VERIF_SERVER_BD_PORT } from "./UDP/constants.js";
import emitter from "./eventos/eventEmitter.js";

//aca se importan los controller que no tengan service todavia
import { TokenUsuario } from "./models/TokenUsuario.js";


export async function main() {
  try {
    await sequelize.sync({force: true}) //sincronización con la bd
    // await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(SERVER_BD_PORT, () => {
      console.log("Server is listening on port", SERVER_BD_PORT);

      emitter.emit("db_connected");

    });

    verifServer.listen(VERIF_SERVER_BD_PORT, () => {
      console.log("VERIF_SERVER is listening on port", VERIF_SERVER_BD_PORT);
    });
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}


