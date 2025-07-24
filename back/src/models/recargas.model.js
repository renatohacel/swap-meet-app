import { sequelize } from "../config/db.config.js";


export class RecargasModel {
    static async findAll() {
        const sql = `EXEC usp_FiltradoMovimientosTarjetas`;
        const result = await sequelize.query(sql);
        return result[0];
    }
}