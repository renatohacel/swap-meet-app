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

    static async insert(newTarifa) {

        newTarifa.color = newTarifa.color.toUpperCase()

        const sql = `
            EXEC usp_MtoTarifasTarjetas 
            @IdTarifaTarjeta = 0, 
            @Año = :anio, 
            @Importe = :importe,
            @Color = :color, 
            @Movimiento = 'I'
        `;

        const result = await sequelize.query(sql, {
            replacements: newTarifa,
        });

        return result[0][0];
    }

    static async update(updatedTarifa) {

        updatedTarifa.color = updatedTarifa.color.toUpperCase()

        const sql = `
            EXEC usp_MtoTarifasTarjetas 
            @IdTarifaTarjeta = :id, 
            @Año = :anio, 
            @Importe = :importe,
            @Color = :color, 
            @Movimiento = 'M'
        `;

        const result = await sequelize.query(sql, {
            replacements: updatedTarifa,
        });

        return result[0][0];
    }

    static async delete(id) {

        const sql = `
            EXEC usp_MtoTarifasTarjetas 
            @IdTarifaTarjeta = :id, 
            @Año = NULL, 
            @Importe = NULL,
            @Color = NULL, 
            @Movimiento = 'E'
        `;

        const result = await sequelize.query(sql, {
            replacements: { id: parseInt(id) },
        });

        return result[0][0];
    }
}
