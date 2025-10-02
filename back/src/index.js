//dependencies
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
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
import { boletosRouter } from "./routes/admin/boletos.router.js";
import { reportesRouter } from "./routes/admin/reportes.router.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable("x-powered-by");
// CONFIGURACION DE VISTAS EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: [FRONT_BASE_URL],
    // origin: '*',
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
app.use('/boletos', boletosRouter);
app.use('/reportes', reportesRouter);

// Servir archivos estáticos de la carpeta media
app.use('/media', express.static(path.resolve(__dirname, 'templates', 'media')));

// RUN
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
