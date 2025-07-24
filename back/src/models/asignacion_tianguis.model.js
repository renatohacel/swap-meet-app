import { sequelize } from "../config/db.config.js";


export class AsignacionTianguisModel {
    static async findAll() {
        const sql = `EXEC usp_ListadoTianguis`;
        const result = await sequelize.query(sql);
        return result[0];
    }
    static async findByUserId(userId) {
        const sql = `EXEC usp_TianguisporUsuario @IdInspector = :userId`;
        const result = await sequelize.query(sql, {
            replacements: { userId },
        });
        return result[0];
    }

    static async insertTianguisToUser(userId, tianguisIds) {
        const sql = `
            EXEC MtoAsignacionTianguisaUsuario 
            @IdTianguis = :tianguisIds, 
            @Movimiento = 'I', 
            @IdUsuario = :userId
        `;
        await sequelize.query(sql, {
            replacements: { tianguisIds, userId },
        });
        return { userId, tianguisIds }
    }

    static async deleteTianguisFromUser(userId, tianguisIds) {
        const sql = `
            EXEC MtoAsignacionTianguisaUsuario
            @IdTianguis = :tianguisIds, 
            @Movimiento = 'E', 
            @IdUsuario = :userId
        `;
        await sequelize.query(sql, {
            replacements: { tianguisIds, userId },
        });
        return { userId, tianguisIds }
    }
}