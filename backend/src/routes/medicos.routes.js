import { Router } from "express";
import {
  createMedico,
  getMedicoByDni,
  getMedicos,
  getMedicoById,
} from "../controllers/medicos.controller.js";

const router = Router();

router.get("/medicos/all", getMedicos);
router.post("/medicos/new", createMedico);
router.get("/medicos/dni/:dni", getMedicoByDni);
router.get("/medicos/id/:id", getMedicoById);


export default router;
