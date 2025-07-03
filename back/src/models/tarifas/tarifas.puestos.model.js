import { sequelize } from "../../config/db.config.js";

export class TarifasPuestosModel {
    static async findAll() {
        try {
            const sql = `EXEC usp_TarifasPuestos`;
            const result = await sequelize.query(sql);
            return result[0][0];
        } catch (error) {
            console.error("Error in UserModel.findAll", error);
            throw error;
        }
    }

    static async update(tarifa, executeBy) {

        const sql = `
          EXEC usp_MtoTarifasPuestos
          @TarifaA = :tarifa_a,  
          @TarifaB = :tarifa_b, 
          @TarifaC = :tarifa_c, 
          @TarifaAInsen = :tarifa_a_insen, 
          @TarifaBInsen = :tarifa_b_insen, 
          @TarifaCInsen = :tarifa_c_insen, 
          @Basura = :basura,
          @Movimiento = 'M',
          @ExecuteBy = :executeBy
        `;

        tarifa.executeBy = executeBy;

            const result = await sequelize.query(sql, {
                replacements: tarifa,
            });

        return result[0][0]

    }
}
