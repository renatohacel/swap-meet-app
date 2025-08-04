//dependencies
import express from "express";
//db init
import "./config/db.config.js";
//middlewares
import cors from "cors";
import cookieParser from "cookie-parser";
//PORT
import { HOST, PORT, FRONT_BASE_URL } from "./config/constans.config.js";
//routers
import { authRouter } from "./routes/auth/auth.router.js";
import { userRouter } from "./routes/catalogs/user.router.js";
import { tarifasRouter } from "./routes/catalogs/tarifas.router.js";
import { lotesRouter } from "./routes/admin/lotes.router.js";
import { tarjetasRouter } from "./routes/catalogs/tarjetas.router.js";
import { historyRouter } from "./routes/history/history.router.js";
import { helperRouter } from "./routes/helper.router.js";
import { asignacionTianguisRouter } from "./routes/admin/asignacion_tianguis.router.js";
import { recargasRouter } from "./routes/admin/recargas.router.js";
import { insenRouter } from "./routes/admin/insen.router.js";

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
app.use('/tarifas', tarifasRouter);
app.use('/generacion-lotes', lotesRouter);
app.use('/tarjetas', tarjetasRouter);
app.use('/historial', historyRouter);
app.use('/helper', helperRouter);
app.use('/asignacion-tianguis', asignacionTianguisRouter);
app.use('/recargas', recargasRouter);
app.use('/capturar-insen', insenRouter);

// RUN
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
