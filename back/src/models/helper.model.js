import { sequelize } from "../config/db.config.js"

export class HelperModel {
    static async findAllGroups() {
        const sql = `SELECT * FROM gruposTianguisWeb`
        const result = await sequelize.query(sql);
        return result[0];
    }
}