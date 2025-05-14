import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { TarifasPuestosController } from "../controllers/tarifas/tarifas.puestos.controller.js";
import { TarifasTarjetasController } from "../controllers/tarifas/tarifas.tarjetas.controller.js";


export const tarifasRouter = Router();

//PUESTOS
tarifasRouter.get("/puestos", authenticate, TarifasPuestosController.getTarifas);
tarifasRouter.patch("/puestos", authenticate, TarifasPuestosController.updateTarifas);

//TARJETAS
tarifasRouter.get('/tarjetas', authenticate, TarifasTarjetasController.getTarifas)
tarifasRouter.post('/tarjetas', authenticate, TarifasTarjetasController.insertTarifa)
tarifasRouter.patch('/tarjetas', authenticate, TarifasTarjetasController.updateTarifa)
tarifasRouter.delete('/tarjetas/:id', authenticate, TarifasTarjetasController.deleteTarifa)

