
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { HelperController } from "../controllers/helper.controller.js";


export const helperRouter = Router();

helperRouter.get('/get-groups', authenticate, HelperController.getGroups);