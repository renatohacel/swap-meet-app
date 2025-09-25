import { sequelize } from "../../../config/db.config.js";

export class ReporteTotalInsenModel {
    static async findTotalInsen() {
        const sql = `exec usp_ReporteTotalesPorInsen`;
        const result = await sequelize.query(sql);

        return result[0];
    }
}