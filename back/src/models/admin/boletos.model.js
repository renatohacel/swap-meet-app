import { sequelize } from "../../config/db.config.js";

export class BoletosModel {

    static async findAll(id) {

        const sql = `exec usp_datosBoletosTianguis @id_tianguis = :id`;
        const result = await sequelize.query(sql, { replacements: { id } });
        return result[0];
    }
}