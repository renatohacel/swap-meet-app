import { sequelize } from "../../config/db.config.js";

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
    static async cancelById(id, executeBy) {
        const sql = `
            EXEC [usp_MtoTarjetasGeneradasDetalle]
            @IdTarjetaGD = :id,
            @IdTarjetaG = NULL,
            @Estatus = 'CANCELADA',
            @Movimiento = 'C',
            @IdLote = NULL,
            @ExecuteBy = :executeBy
        `
        let result = await sequelize.query(sql, {
            replacements: { id, executeBy },
        });
        return result[0][0];
    }
}
