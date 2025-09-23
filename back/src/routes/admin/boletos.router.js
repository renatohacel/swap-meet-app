import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/permissions.middleware.js";
import { BoletosController } from "../../controllers/admin/boletos.controller.js";


export const boletosRouter = Router();

//TARJETAS
boletosRouter.get('/:id',
    authenticate,
    authorize('admin', 'create', 'boletos'),
    BoletosController.getBoletos
);

boletosRouter.get('/print/:id',
    authenticate,
    authorize('admin', 'create', 'boletos'),
    BoletosController.generatePDF
);
