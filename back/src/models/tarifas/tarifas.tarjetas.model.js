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

    static async insert(newTarifa, executeBy) {

        newTarifa.color = newTarifa.color.toUpperCase()

        const sql = `
            EXEC usp_MtoTarifasTarjetas 
            @IdTarifaTarjeta = 0, 
            @Año = :anio, 
            @Importe = :importe,
            @Color = :color, 
            @Movimiento = 'I',
            @ExecuteBy = :executeBy
        `;

        newTarifa.executeBy = executeBy;

        const result = await sequelize.query(sql, {
            replacements: newTarifa,
        });

        return result[0][0];
    }

    static async update(updatedTarifa, executeBy) {

        updatedTarifa.color = updatedTarifa.color.toUpperCase()

        const sql = `
            EXEC usp_MtoTarifasTarjetas 
            @IdTarifaTarjeta = :id, 
            @Año = :anio, 
            @Importe = :importe,
            @Color = :color, 
            @Movimiento = 'M',
            @ExecuteBy = :executeBy
        `;

        updatedTarifa.executeBy = executeBy;

        const result = await sequelize.query(sql, {
            replacements: updatedTarifa,
        });

        return result[0][0];
    }

    static async delete(id, executeBy) {

        const sql = `
            EXEC usp_MtoTarifasTarjetas 
            @IdTarifaTarjeta = :id, 
            @Año = NULL, 
            @Importe = NULL,
            @Color = NULL, 
            @Movimiento = 'E',
            @ExecuteBy = :executeBy
        `;

        const result = await sequelize.query(sql, {
            replacements: { id: parseInt(id), executeBy },
        });

        return result[0][0];
    }
}
