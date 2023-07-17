import express from "express";
import verificationRoutes from "./routes/verification.routes.js";

import cors from "cors";


import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use("/validate/id/node_modules/jq-fakeloader/dist/",express.static(path.join(__dirname, '../node_modules/jq-fakeloader/dist/')));
app.use(verificationRoutes);


export default app;