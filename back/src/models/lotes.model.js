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

    static async insert(lote) {
        let tarjetas = {};
        let total_tarjetas = 0;
        for (const [key, value] of Object.entries(lote)) {
            if (!isNaN(value) && value !== 0 && key !== 'id') {
                total_tarjetas += value;
                //id_tarifa_tarjeta       //monto_tarifa
                tarjetas[parseInt(key)] = parseInt(value);
            }
        }

        lote.comentarios = lote?.comentarios?.toUpperCase();
        //monto_sumado
        lote.total_tarjetas = parseInt(total_tarjetas);

        let sql = `
                EXEC usp_MtoLoteTarjetas
                @IdLote = 0,
                @Usuario = :user,
                @Comentario = :comentarios,
                @TarjetasGeneradas = :total_tarjetas,
                @Movimiento = 'I'
            `

        let result = await sequelize.query(sql, {
            replacements: lote,
        });

        //id_lote
        const { IdLote: idLote } = result[0][0]

        let tarjetasGeneradas = {}

        if (total_tarjetas > 0) {
            //id_tarifa  //monto_tarifa
            for (const [key, value] of Object.entries(tarjetas)) {
                if (!isNaN(value) && value !== 0) {
                    sql = `
                        EXEC usp_MtoTarjetasGeneradas
                        @IdTarjetaG = NULL,
                        @IdLote = :id_lote,
                        @IdTarifaTarjeta = :id_tarifa_tarjeta,
                        @TotalTarjetas = :total,
                        @Movimiento = 'I'
                    `
                    const data = {
                        id_lote: idLote,
                        id_tarifa_tarjeta: key, //el id de la tarifa
                        total: value, //cuantas tarjetas fueron por tarifa
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
                        @IdLote = :id_lote
                    `
                    const data = {
                        id_tarjetaG: key,
                        id_lote: idLote
                    }

                    await sequelize.query(sql, {
                        replacements: data,
                    });
                }
            }
        }
    }

    //--------------------------------UPDATE----------------------------------------------//

    static async update(lote) {
        let tarjetas = {};
        let total_tarjetas = 0;

        console.log(lote)

        for (const [key, value] of Object.entries(lote)) {
            if (!isNaN(value) && value !== 0 && key !== 'id') {
                total_tarjetas += value;
                //id_tarifa_tarjeta       //monto_tarifa
                tarjetas[parseInt(key)] = parseInt(value);
            }
        }

        lote.comentarios = lote.comentarios.toUpperCase();
        //monto_sumado
        lote.total_tarjetas = parseInt(total_tarjetas);

        let sql = `
                EXEC usp_MtoLoteTarjetas
                @IdLote = :id,
                @Usuario = :user,
                @Comentario = :comentarios,
                @TarjetasGeneradas = :total_tarjetas,
                @Movimiento = 'M'
            `

        let result = await sequelize.query(sql, {
            replacements: lote,
        });

        //id_lote
        const { IdLote: idLote } = result[0][0]

        const idsTarjetasGeneradas = await this.findTarjetasG(idLote);

        let tarjetasGeneradas = {}

        if (idsTarjetasGeneradas.length > 0) {
            for (const [key, value] of Object.entries(tarjetas)) {
                if (!isNaN(value) && value !== 0) {
                    // Buscar el IdTarjetaG correspondiente al IdTarifaTarjeta
                    const tarjetaGenerada = idsTarjetasGeneradas.find(
                        (tarjeta) => tarjeta.IdTarifaTarjeta === parseInt(key)
                    );
                    if (tarjetaGenerada) {
                        sql = `
                        EXEC usp_MtoTarjetasGeneradas
                        @IdTarjetaG = :id_tarjetaG,
                        @IdLote = :id_lote,
                        @IdTarifaTarjeta = :id_tarifa_tarjeta,
                        @TotalTarjetas = :total,
                        @Movimiento = 'M'
                    `;
                        const data = {
                            id_tarjetaG: tarjetaGenerada.IdTarjetaG, // IdTarjetaG correspondiente
                            id_lote: idLote,
                            id_tarifa_tarjeta: parseInt(key), // el id de la tarifa
                            total: value, // cuántas tarjetas fueron por tarifa
                        };

                        result = await sequelize.query(sql, {
                            replacements: data,
                        });

                        // Devuelve cada id de los montos que se insertaron
                        const { IdTarjetaG: id_tarjetas_generadas } = result[0][0];

                        // Lo almacenamos en este objeto
                        tarjetasGeneradas = {
                            ...tarjetasGeneradas,
                            [parseInt(id_tarjetas_generadas)]: value,
                        };
                    }
                }
            }
        } else {
            if (total_tarjetas > 0) {
            //id_tarifa  //monto_tarifa
            for (const [key, value] of Object.entries(tarjetas)) {
                if (!isNaN(value) && value !== 0) {
                    sql = `
                        EXEC usp_MtoTarjetasGeneradas
                        @IdTarjetaG = NULL,
                        @IdLote = :id_lote,
                        @IdTarifaTarjeta = :id_tarifa_tarjeta,
                        @TotalTarjetas = :total,
                        @Movimiento = 'I'
                    `
                    const data = {
                        id_lote: idLote,
                        id_tarifa_tarjeta: key, //el id de la tarifa
                        total: value, //cuantas tarjetas fueron por tarifa
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
                        @IdLote = :id_lote
                    `
                    const data = {
                        id_tarjetaG: key,
                        id_lote: idLote
                    }

                    await sequelize.query(sql, {
                        replacements: data,
                    });
                }
            }
        }
        }


    }
}