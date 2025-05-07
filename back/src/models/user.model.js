import { sequelize } from "../config/db.config.js";

export class UserModel {
  static async findAll() {
    try {
      const sql = `EXEC usp_ListadoUsuarios`;
      const result = await sequelize.query(sql);
      return result[0];
    } catch (error) {
      console.error('Error in UserModel.findAll',error);
      throw error;
    }
  }
}
