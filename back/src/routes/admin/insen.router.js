import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/permissions.middleware.js";
import { InsenController } from "../../controllers/admin/insen.controller.js";


export const insenRouter = Router();

//TARJETAS
insenRouter.get('/:id',
    authenticate,
    authorize('admin', 'view', 'capturar_insen'),
    InsenController.getInsenById
);

insenRouter.put('/:id',
    authenticate,
    authorize('admin', 'update', 'capturar_insen'),
    InsenController.updateInsen
);

