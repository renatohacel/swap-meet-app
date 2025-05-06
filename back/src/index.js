//dependencies
import express from "express";
//db init
import "./config/db.config.js";
//middlewares
import cors from "cors";
//PORT
import { HOST, PORT, FRONT_BASE_URL } from "./config/constans.config.js";
//routers
import { authRouter } from "./routes/auth.router.js";

const app = express();
app.disable("x-powered-by");

//MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: FRONT_BASE_URL,
    credentials: true,
  })
);

//ROUTES
app.use("/", authRouter);

//RUN
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
