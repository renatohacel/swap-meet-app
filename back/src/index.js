//dependencies
import express from "express";
import jwt from "jsonwebtoken"; // <-- Asegúrate de importar jwt
//db init
import "./config/db.config.js";
//middlewares
import cors from "cors";
import cookieParser from "cookie-parser";
//PORT
import { HOST, PORT, FRONT_BASE_URL } from "./config/constans.config.js";
//routers
import { authRouter } from "./routes/auth.router.js";
import { userRouter } from "./routes/user.router.js";

const app = express();
app.disable("x-powered-by");

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: FRONT_BASE_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// Rutas
app.use("/", authRouter);
app.use("/users", userRouter);

// RUN
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
