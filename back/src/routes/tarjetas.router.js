import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { TarjetasController } from "../controllers/tarjetas.controller.js";
import { authorize } from "../middlewares/permissions.middleware.js";


export const tarjetasRouter = Router();

//TARJETAS
tarjetasRouter.get('/:id',
    authenticate,
    authorize('admin', 'view', 'generacion_tarjetas'),
    TarjetasController.getTarjetasLote)

