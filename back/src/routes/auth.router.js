import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

// Login y logout no necesitan autenticación
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", authenticate, AuthController.logout);

// PRUEBA RUTAS PROTEGIDAS
// authRouter.get("/prueba", authenticate, AuthController.prueba);
