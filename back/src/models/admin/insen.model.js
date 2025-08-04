import { sequelize } from "../../config/db.config.js";


export class InsenModel {


    static async findInsenForId(id) {
        const sql = `
            EXEC usp_ConsultarInsenComerciante @id = :id
        `;
        const result = await sequelize.query(sql, {
            replacements: { id },
        });
        return result[0];
    }

    static async updateInsen(id_puesto, movimiento, executeBy) {
        const sql = `
            exec usp_MtoInsenComerciantes 
                @idPuesto = :id_puesto, 
                @movimiento = ${movimiento ? "'I'" : "'E'"},
                @executeBy = :executeBy
        `;
        const result = await sequelize.query(sql, {
            replacements: { id_puesto, executeBy },
        });

        return result[0][0];
    }
}