import { sequelize } from "../config/db.config.js";

export class LotesTarjetasModel {

    //--------------------------------FIND ALL----------------------------------------------//

    static async findAll() {
        const sql = `EXEC usp_ListadoLotedeTarjetas`;
        const result = await sequelize.query(sql);
        return result[0];
    }

    //--------------------------------FIND TARJETAS GENERADAS----------------------------------------------//

    static async findTarjetasG(id) {
        const sql = `
            EXEC usp_ListadoTarjetasGeneradas
            @IdLote = :id
        `
        let result = await sequelize.query(sql, {
            replacements: { id },
        });
        return result[0];
    }


    //--------------------------------INSERT----------------------------------------------//

    static async insert(lote, executeBy) {
        let tarjetas = {};
        let total_tarjetas = 0;
        for (const [key, value] of Object.entries(lote)) {
            if (!isNaN(value) && value !== 0 && key !== 'id') {
                total_tarjetas += value;
                //id_tarifa_tarjeta       //monto_tarifa
                tarjetas[parseInt(key)] = parseInt(value);
            }
        }
        if (total_tarjetas > 0) {
            lote.comentarios = lote?.comentarios?.toUpperCase();
            //monto_sumado
            lote.total_tarjetas = parseInt(total_tarjetas);

            lote.executeBy = executeBy;

            let sql = `
                EXEC usp_MtoLoteTarjetas
                @IdLote = 0,
                @Usuario = :user,
                @Comentario = :comentarios,
                @TarjetasGeneradas = :total_tarjetas,
                @Movimiento = 'I',
                @ExecuteBy = :executeBy
            `

            let result = await sequelize.query(sql, {
                replacements: lote,
            });

            //id_lote
            const { IdLote: idLote } = result[0][0]

            let tarjetasGeneradas = {}

            //id_tarifa  //monto_tarifa
            for (const [key, value] of Object.entries(tarjetas)) {
                if (!isNaN(value) && value !== 0) {
                    sql = `
                        EXEC usp_MtoTarjetasGeneradas
                        @IdTarjetaG = NULL,
                        @IdLote = :id_lote,
                        @IdTarifaTarjeta = :id_tarifa_tarjeta,
                        @TotalTarjetas = :total,
                        @Movimiento = 'I',
                        @ExecuteBy = :executeBy
                    `
                    const data = {
                        id_lote: idLote,
                        id_tarifa_tarjeta: key, //el id de la tarifa
                        total: value, //cuantas tarjetas fueron por tarifa
                        executeBy: executeBy,
                    }

                    result = await sequelize.query(sql, {
                        replacements: data,
                    });

                    //devuelve cada id de los montos que se insertaron
                    //si fueron 10 moradas, 5 azul, etc.
                    //son [id_monto] = [(si fueron 10, etc)]
                    const { IdTarjetaG: id_tarjetas_generadas } = result[0][0]

                    // lo almacenamos en este objeto
                    tarjetasGeneradas = {
                        ...tarjetasGeneradas,
                        [parseInt(id_tarjetas_generadas)]: value
                    }
                }
            }
            //recorremos tarjetasGeneradas que son los montos de ejemplo, moradas, azules que se generaron
            //id_tarjetas_generada //monto
            for (const [key, value] of Object.entries(tarjetasGeneradas)) {
                //insertamos cada tarjeta recorriendo el monto
                for (let i = 0; i < value; i++) {
                    sql = `
                        EXEC usp_MtoTarjetasGeneradasDetalle
                        @IdTarjetaGD = NULL,
                        @IdTarjetaG = :id_tarjetaG,
                        @Estatus = 'GENERADA',
                        @Movimiento = 'I',
                        @IdLote = :id_lote,
                        @ExecuteBy = :executeBy
                    `
                    const data = {
                        id_tarjetaG: key,
                        id_lote: idLote,
                        executeBy: executeBy,
                    }

                    await sequelize.query(sql, {
                        replacements: data,
                    });
                }
            }
        } else {
            return { Error: 'INSERTE TARJETAS PARA CREAR EL LOTE' }
        }
    }

    static async delete(id, executeBy) {
        let sql = `
            EXEC usp_MtoLoteTarjetas
            @IdLote = :id,
            @Usuario = NULL,
            @Comentario = NULL,
            @TarjetasGeneradas = NULL,
            @Movimiento = 'E',
            @ExecuteBy = :executeBy
        `;

        const result = await sequelize.query(sql, {
            replacements: { id, executeBy },
        });

        if (result[0][0]?.Error) return result[0][0];

        sql = `
            EXEC usp_MtoTarjetasGeneradas
            @IdTarjetaG = NULL,
            @IdLote = :id,
            @IdTarifaTarjeta = NULL,
            @TotalTarjetas = NULL,
            @Movimiento = 'E',
            @ExecuteBy = :executeBy
        `;

        await sequelize.query(sql, {
            replacements: { id, executeBy },
        });

        sql = `
            EXEC usp_MtoTarjetasGeneradasDetalle
            @IdTarjetaGD = NULL,
            @IdTarjetaG = NULL,
            @Estatus = NULL,
            @Movimiento = 'E',
            @IdLote = :id,
            @ExecuteBy = :executeBy
        `;

        await sequelize.query(sql, {
            replacements: { id, executeBy },
        });

    }
}