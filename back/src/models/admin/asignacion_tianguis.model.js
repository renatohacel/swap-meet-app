import { sequelize } from "../../config/db.config.js";


export class AsignacionTianguisModel {
    static async findAll() {
        const sql = `EXEC usp_ListadoTianguis`;
        const result = await sequelize.query(sql);
        return result[0];
    }
    static async findByUserId(userId) {
        const sql = `EXEC usp_TianguisporUsuario @IdUsuario = :userId`;
        const result = await sequelize.query(sql, {
            replacements: { userId },
        });
        return result[0];
    }

    static async insertTianguisToUser(userId, tianguisIds, executeBy) {
        const sql = `
            EXEC MtoAsignacionTianguisaUsuario 
            @IdTianguis = :tianguisIds, 
            @Movimiento = 'I', 
            @IdUsuario = :userId,
            @ExecuteBy = :executeBy
        `;
        await sequelize.query(sql, {
            replacements: { tianguisIds, userId, executeBy },
        });
        return { userId, tianguisIds }
    }

    static async deleteTianguisFromUser(userId, tianguisIds, executeBy) {
        const sql = `
            EXEC MtoAsignacionTianguisaUsuario
            @IdTianguis = :tianguisIds, 
            @Movimiento = 'E', 
            @IdUsuario = :userId,
            @ExecuteBy = :executeBy
        `;
        await sequelize.query(sql, {
            replacements: { tianguisIds, userId, executeBy },
        });
        return { userId, tianguisIds }
    }
}