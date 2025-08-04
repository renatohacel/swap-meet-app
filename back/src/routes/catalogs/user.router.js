import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { UserController } from "../../controllers/catalogs/user.controller.js";
import { authorize } from "../../middlewares/permissions.middleware.js";

export const userRouter = Router();

userRouter.get("/",
    authenticate,
    authorize('catalogs', 'view', 'users'),
    UserController.getUsers
);

userRouter.get('/actives',
    authenticate,
    authorize('admin', 'view', 'asignacion_tianguis'),
    UserController.getActiveUsers
);

userRouter.get("/:id",
    authenticate,
    authorize('catalogs', 'view', 'users'),
    UserController.getUserById
);
userRouter.post("/",
    authenticate,
    authorize('catalogs', 'create', 'users'),
    UserController.insertUser
);
userRouter.patch('/:id',
    authenticate,
    authorize('catalogs', 'update', 'users'),
    UserController.updateUser
);
userRouter.put('/change_password',
    authenticate,
    UserController.updatePassword
);
