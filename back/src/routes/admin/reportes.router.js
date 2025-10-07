import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/permissions.middleware.js";
import { ReporteTotalDiaController } from "../../controllers/admin/reportes/reporte_total_dia.controller.js";
import { ReporteTotalInsenController } from "../../controllers/admin/reportes/reporte_total_insen.controller.js";
import { ReporteTotalGeneralesController } from "../../controllers/admin/reportes/reporte_total_generales.controller.js";
import { ReportePadronTianguisController } from "../../controllers/admin/reportes/reporte_padron_tianguis.controller.js";


export const reportesRouter = Router();

reportesRouter.get('/print/reporte-total-dia',
    authenticate,
    authorize('admin', 'create', 'reportes_totales_dia'),
    ReporteTotalDiaController.generateExcelReport
);

reportesRouter.get('/print/reporte-total-insen',
    authenticate,
    authorize('admin', 'create', 'reportes_totales_insen'),
    ReporteTotalInsenController.generateExcelReport
);

reportesRouter.get('/print/reporte-total-generales',
    authenticate,
    authorize('admin', 'create', 'reportes_totales_generales'),
    ReporteTotalGeneralesController.generateExcelReport
    // ReporteTotalGeneralesController.getReporteTotalGenerales
);

reportesRouter.get('/print/reportes-padron-tianguis/:id',
    authenticate,
    authorize('admin', 'create', 'reportes_padron_tianguis'),
    ReportePadronTianguisController.generateExcelReport
    // ReportePadronTianguisController.getReportePadronTianguis
)
