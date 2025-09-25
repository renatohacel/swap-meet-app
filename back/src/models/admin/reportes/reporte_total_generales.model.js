import { sequelize } from "../../../config/db.config.js";



export class ReporteTotalGeneralesModel {

    static async findTotalGenerales() {
        const sql = `exec usp_ReporteTotalesGenerales`;
        const result = await sequelize.query(sql);

        // Obtener la clave del JSON (siempre será la primera clave del objeto)
        const firstKey = Object.keys(result[0][0])[0];
        const jsonData = result[0][0][firstKey];

        return JSON.parse(jsonData);
    }

}