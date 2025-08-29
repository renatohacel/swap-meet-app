import { sequelize } from "../../config/db.config.js";

export class BoletosModel {

    static async findAll() {
        const sql = `
            SELECT *
            FROM CuotasPuestosTemporal
            WHERE IdTianguis = 61
            AND Fecha >= '2024-02-04 00:00:00'
            AND Fecha <= '2024-02-04 23:59:59'
        `;
        const result = await sequelize.query(sql);
        return result[0];
    }
}