import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { LotesTarjetasController } from "../controllers/lotes.controller.js";
import { authorize } from "../middlewares/permissions.middleware.js";


export const lotesRouter = Router();

//TARJETAS
lotesRouter.get('/',
    authenticate,
    authorize('admin', 'view', 'generacion_tarjetas'),
    LotesTarjetasController.getLotes
);
lotesRouter.get('/:id',
    authenticate,
    authorize('admin', 'view', 'generacion_tarjetas'),
    LotesTarjetasController.getTarjetasG
);
lotesRouter.post('/',
    authenticate,
    authorize('admin', 'create', 'generacion_tarjetas'),
    LotesTarjetasController.insertLote
);
lotesRouter.delete('/:id',
    authenticate,
    authorize('admin', 'delete', 'generacion_tarjetas'),
    LotesTarjetasController.deleteLote
);

