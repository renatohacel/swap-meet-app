import { sequelize } from "../config/db.config.js"

export class HelperModel {
    static async findAllGroups() {
        const sql = `SELECT * FROM gruposTianguisWeb`
        const result = await sequelize.query(sql);
        return result[0];
    }

    static async findAllNameComerciantes() {
        const sql = `exec usp_ConsultaComerciantesTianguis`
        const result = await sequelize.query(sql);
        return result[0];
    }

    static async updateTarjetaComerciante(id, tarifa, num_tarjeta, executeBy) {
        const sql = `
            exec usp_UpdateTarjetaComerciante 
                @idComerciante = :id, 
                @tarifa = 'Tarjeta ${tarifa}',
                @num_tarjeta = :num_tarjeta,
                @ExecuteBy = :executeBy
        `
        const result = await sequelize.query(sql, {
            replacements: { id, num_tarjeta, executeBy }
        });
        return result[0][0];
    }
}