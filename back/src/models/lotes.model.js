import { sequelize } from "../config/db.config.js";

export class LotesTarjetasModel {
    static async findAll() {
        const sql = `EXEC usp_ListadoLotedeTarjetas`;
        const result = await sequelize.query(sql);
        return result[0];
    }


    static async insert(lote) {
        let tarjetas = {};
        let total_tarjetas = 0;
        for (const [key, value] of Object.entries(lote)) {
            if (!isNaN(value) && value !== 0) {
                total_tarjetas += value;
                tarjetas[key] = value;
            }
        }

        lote.comentarios = lote.comentarios.toUpperCase();
        lote.total_tarjetas = parseInt(total_tarjetas);

        const sql = `
                EXEC usp_MtoLoteTarjetas
                @IdLote = 0,
                @Usuario = :user,
                @Comentario = :comentarios,
                @TarjetasGeneradas = :total_tarjetas,
                @Movimiento = 'I'
            `

        const result = await sequelize.query(sql, {
            replacements: lote,
        });

        const { IdLote: idLote } = result[0][0]

        if (total_tarjetas > 0) {
            
        }


    }
}