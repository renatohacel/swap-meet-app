import { sequelize } from "../config/db.config.js";

export class HistoryModel {
    static async findAll() {
        const sql = `
            SELECT * FROM BitacoraTianguis_WEB
        `;

        try {
            const result = await sequelize.query(sql);
            return result[0];
        } catch (error) {
            console.error("Error fetching history:", error);
            throw error;
        }
    }
}