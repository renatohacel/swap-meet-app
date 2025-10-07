import { sequelize } from "../../../config/db.config.js";

export class ReportePadronTianguisModel {

    static async findPadronTianguis(id) {
        const sql = `exec usp_PadronTianguis @id_tianguis = :id`;
        const result = await sequelize.query(sql, { replacements: { id } });
        return result[0];
    }


}