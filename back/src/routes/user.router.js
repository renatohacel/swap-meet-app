import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/", authenticate, UserController.getUsers);
userRouter.get("/:id", authenticate, UserController.getUserById);
userRouter.post("/", authenticate, UserController.insertUser);
userRouter.patch('/:id', authenticate, UserController.updateUser);
userRouter.put('/change_password', authenticate, UserController.updatePassword);
