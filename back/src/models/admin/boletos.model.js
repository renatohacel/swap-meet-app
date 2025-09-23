import { sequelize } from "../../config/db.config.js";

export class BoletosModel {

    static async findAll(id, fecha) {
        
        const sql = `exec usp_datosBoletosTianguis @id_tianguis = :id, @fecha = :fecha`;
        const result = await sequelize.query(sql, { replacements: { id, fecha } });
        return result[0];
    }
}