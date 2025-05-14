import { sequelize } from "../../config/db.config.js";

export class TarifasTarjetasModel {
    static async findAll() {
        try {
            const sql = `EXEC usp_ListadoTarifasTarjetas`;
            const result = await sequelize.query(sql);
            return result[0];
        } catch (error) {
            console.error("Error in UserModel.findAll", error);
            throw error;
        }
    }

    // static async update(tarifa) {

    //     console.log(tarifa)

    //     const sql = `
    //       EXEC usp_MtoTarifasPuestos
    //       @TarifaA = :tarifa_a,  
    //       @TarifaB = :tarifa_b, 
    //       @TarifaC = :tarifa_c, 
    //       @TarifaAInsen = :tarifa_a_insen, 
    //       @TarifaBInsen = :tarifa_b_insen, 
    //       @TarifaCInsen = :tarifa_a_insen, 
    //       @Basura = :basura,
    //       @Movimiento = 'M'
    //     `;

    //         const result = await sequelize.query(sql, {
    //             replacements: tarifa,
    //         });

    //     return result[0][0]

    // }
}
