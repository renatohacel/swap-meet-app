import { sequelize } from "../config/db.config.js";


export class AuthModel {
  static async login(username, password) {
    try {
      const sql = `EXEC usp_ValidaUsuario @Usuario = :username, @Pswd = :password`;
      const result = await sequelize.query(sql, {
        replacements: { username, password },
      });
      
      return result[0][0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
