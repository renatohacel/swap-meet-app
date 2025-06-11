import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { TarjetasController } from "../controllers/tarjetas.controller.js";


export const tarjetasRouter = Router();

//TARJETAS
tarjetasRouter.get('/:id', authenticate, TarjetasController.getTarjetasLote)

