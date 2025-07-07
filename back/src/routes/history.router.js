import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { HistoryController } from "../controllers/history.controller.js";


export const historyRouter = Router();

historyRouter.get('/', authenticate, HistoryController.getHistory);