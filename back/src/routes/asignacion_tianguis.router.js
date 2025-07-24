import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/permissions.middleware.js";
import { AsignacionTianguisController } from "../controllers/asignacion_tianguis.controller.js";


export const asignacionTianguisRouter = Router();


asignacionTianguisRouter.get('/',
    authenticate,
    authorize('admin', 'view', 'asignacion_tianguis'),
    AsignacionTianguisController.getListadoTianguis
);

asignacionTianguisRouter.get('/:id',
    authenticate,
    authorize('admin', 'view', 'asignacion_tianguis'),
    AsignacionTianguisController.getTianguisByUserId
)

asignacionTianguisRouter.post('/',
    authenticate,
    authorize('admin', 'update', 'asignacion_tianguis'),
    AsignacionTianguisController.insertTianguisToUser
);

asignacionTianguisRouter.patch('/',
    authenticate,
    authorize('admin', 'update', 'asignacion_tianguis'),
    AsignacionTianguisController.deleteTianguisFromUser
);
