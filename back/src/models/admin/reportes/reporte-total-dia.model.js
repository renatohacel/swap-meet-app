import { sequelize } from "../../../config/db.config.js";

export class ReporteTotalDiaModel {
    static async findTotalDia(dia_semana, fecha) {
        const sql = `exec usp_ReporteTotalesPorDia @dia_semana = :dia_semana, @fecha = :fecha`;
        const result = await sequelize.query(sql, {
            replacements: { dia_semana, fecha }
        });
        // Obtener la clave del JSON (siempre será la primera clave del objeto)
        const firstKey = Object.keys(result[0][0])[0];
        const jsonData = result[0][0][firstKey];
        
        return JSON.parse(jsonData);
    }
}