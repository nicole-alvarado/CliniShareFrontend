import { Router } from "express";

import {getAll,resolver,getPacientesYConflictos} from "../controllers/pacienteConflictivo.controller.js";

const router = Router();

router.get("/conflictos/all", getAll);
router.get("/conflictos/includePacientes/all", getPacientesYConflictos);
router.post("/conflictos/resolver", resolver);


export default router;
