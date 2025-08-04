import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { TarifasPuestosController } from "../../controllers/catalogs/tarifas/tarifas.puestos.controller.js";
import { TarifasTarjetasController } from "../../controllers/catalogs/tarifas/tarifas.tarjetas.controller.js";
import { authorize, authorizeAny } from "../../middlewares/permissions.middleware.js";


export const tarifasRouter = Router();

//PUESTOS
tarifasRouter.get("/puestos",
    authenticate,
    authorize('catalogs', 'view', 'tarifas_puestos'),
    TarifasPuestosController.getTarifas);
tarifasRouter.patch("/puestos",
    authenticate,
    authorize('catalogs', 'update', 'tarifas_puestos'),
    TarifasPuestosController.updateTarifas);

//TARJETAS
tarifasRouter.get('/tarjetas',
    authenticate,
    authorizeAny([
        { module: 'admin', action: 'view', resource: 'generacion_tarjetas' },
        { module: 'catalogs', action: 'create', resource: 'tarifas_tarjetas' }
    ]),
    TarifasTarjetasController.getTarifas
);
tarifasRouter.post('/tarjetas',
    authenticate,
    authorize('catalogs', 'create', 'tarifas_tarjetas'),
    TarifasTarjetasController.insertTarifa
);
tarifasRouter.patch('/tarjetas',
    authenticate,
    authorize('catalogs', 'update', 'tarifas_tarjetas'),
    TarifasTarjetasController.updateTarifa
);
tarifasRouter.delete('/tarjetas/:id',
    authenticate,
    authorize('catalogs', 'delete', 'tarifas_tarjetas'),
    TarifasTarjetasController.deleteTarifa
);

