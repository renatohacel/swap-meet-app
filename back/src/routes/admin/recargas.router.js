import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { RecargasController } from "../../controllers/admin/recargas.controller.js";
import { authorize } from "../../middlewares/permissions.middleware.js";


export const recargasRouter = Router();

//TARJETAS
recargasRouter.get('/',
    authenticate,
    authorize('admin', 'view', 'recargas'),
    RecargasController.getRecargas
);

