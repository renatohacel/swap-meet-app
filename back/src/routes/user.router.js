import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/", authenticate, UserController.getUsers);
