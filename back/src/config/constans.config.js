import { config } from "dotenv";
config();

export const {
  FRONT_BASE_URL = "http://localhost:5173",
  PORT = 3000,
  HOST = "0.0.0.0",
  DB_HOST = "172.16.4.50",
  DB_PORT = "1433",
  DB_NAME = "simercadosPruebas",
  DB_USER = "si_merca",
  DB_PASSWORD = "mercados",
  DB_DIALECT = "mssql",

  SALT_ROUNDS = 12,
} = process.env;
