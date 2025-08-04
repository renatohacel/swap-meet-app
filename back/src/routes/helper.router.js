
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { HelperController } from "../controllers/helper.controller.js";
import { authorize } from "../middlewares/permissions.middleware.js";


export const helperRouter = Router();

helperRouter.get('/get-groups', authenticate, HelperController.getGroups);


helperRouter.get('/get-comerciantes-names',
    authenticate,
    authorize('admin', 'view', 'capturar_insen'),
    HelperController.getComerciantesNames
);

helperRouter.put(
    '/update-tarjeta-comerciante/:id',
    authenticate,
    authorize('admin', 'update', 'capturar_insen'),
    HelperController.updateTarjetaComerciante
);