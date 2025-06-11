import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { LotesTarjetasController } from "../controllers/lotes.controller.js";


export const lotesRouter = Router();

//TARJETAS
lotesRouter.get('/', authenticate, LotesTarjetasController.getLotes)
lotesRouter.get('/:id', authenticate, LotesTarjetasController.getTarjetasG)
lotesRouter.post('/', authenticate, LotesTarjetasController.insertLote)
lotesRouter.patch('/', authenticate, LotesTarjetasController.updateLote)

