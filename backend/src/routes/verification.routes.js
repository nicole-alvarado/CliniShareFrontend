import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.get("/validate/id/:id", userController.validateToken);
export default router;
