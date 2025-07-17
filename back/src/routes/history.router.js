import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { HistoryController } from "../controllers/history.controller.js";
import { authorize } from "../middlewares/permissions.middleware.js";


export const historyRouter = Router();

historyRouter.get('/',
    authenticate,
    authorize('history', 'view', 'historial'),
    HistoryController.getHistory);