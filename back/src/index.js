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

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para validar la cookie
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (!token) {
    console.log("No token provided");
    return next();
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.session.user = data;
    console.log("Token verified successfully");
  } catch (err) {
    console.error("Error verificando token:", err.message);
  }
  next();
});

// Rutas
app.use("/", authRouter);

// app.get("/prueba", (req, res) => {
//   const { user } = req.session;
//   if (user) {
//     res.send({ user });
//   } else {
//     res.status(401).send("unauthorized");
//   }
// });

// RUN
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
