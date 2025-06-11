import { Sequelize } from "sequelize";
import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./constans.config.js";

export const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      requestTimeout: 120000,
    },
  },
  connectionTimeout: 120000,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("-------------------DATABASE------------------");
    console.log("Connection has been established successfully.");
    console.log("---------------------------------------------");
  } catch (error) {
    console.log("-------------------ERROR DATABASE------------------");
    console.error("Unable to connect to the database:", error);
    console.log("---------------------------------------------------");
  }
}

testConnection();
