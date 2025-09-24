import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/permissions.middleware.js";
import { ReporteTotalDiaController } from "../../controllers/admin/reportes/reporte-total-dia.controller.js";


export const reportesRouter = Router();

reportesRouter.get('/print/reporte-total-dia',
    authenticate,
    authorize('admin', 'create', 'reportes_totales_dia'),
    ReporteTotalDiaController.generateExcelReport
);
