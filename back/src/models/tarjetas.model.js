import { sequelize } from "../config/db.config.js";

export class TarjetasModel {
    static async findByIdLote(idLote) {
        const sql = `
                    EXEC usp_ListadoTarjetasGeneradasDetalle
                    @IdLote = :idLote
                `
        let result = await sequelize.query(sql, {
            replacements: { idLote },
        });
        
        return result[0];
    }
}
