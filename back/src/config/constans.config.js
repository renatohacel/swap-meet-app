import { config } from "dotenv";
config();

export const {
  PORT = 3000,
  HOST = '10.20.17.44',
  DB_HOST = "172.16.4.50",
  DB_PORT = "1433",
  DB_NAME = "simercadosPruebas",
  DB_USER = "si_merca",
  DB_PASSWORD = "mercados",
  DB_DIALECT = "mssql",
} = process.env;