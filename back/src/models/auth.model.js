import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sequelize } from "../config/db.config.js";

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthModel {
  static async login(username, password) {
    try {
      const sql = `EXEC usp_ValidaUsuario @Usuario = :username, @Pswd = :password`;
      const result = await sequelize.query(sql, {
        replacements: { username, password },
      });
      
      if (result[0][0]) {
        const token = jwt.sign(result[0][0], JWT_SECRET, { expiresIn: '1h' });
        return { token };
      }
      return result[0][0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
