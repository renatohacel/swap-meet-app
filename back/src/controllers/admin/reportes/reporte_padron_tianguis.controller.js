import { ReportePadronTianguisModel } from "../../../models/admin/reportes/reporte_padron_tianguis.model.js";
import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ReportePadronTianguisController {

    static async getReportePadronTianguis(req, res) {
        const { id } = req.params;
        try {
            const data = await ReportePadronTianguisModel.findPadronTianguis(id);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ error: 'Error fetching report' });
        }
    }


    static async generateExcelReport(req, res) {
        const { id } = req.params;
        try {
            const data = await ReportePadronTianguisModel.findPadronTianguis(id);
            if (!data || data.length === 0) {
                return res.status(404).send("No se encontraron datos para el reporte");
            }

            // Cargar plantilla Excel
            const templatePath = path.join(__dirname, '../../../templates/reporte_padron_tianguis_template.xlsx');
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(templatePath);
            const worksheet = workbook.getWorksheet(1);

            // Fecha y día actual
            const now = new Date();
            const fechaActual = now.toISOString().slice(0, 10);
            
            const primerRegistro = data[0];
            const diaLabora = primerRegistro.dia_labora;
            const nombreTianguis = primerRegistro.nombre_tianguis;
            
            worksheet.getCell('D2').value = fechaActual;
            worksheet.getCell('D3').value = diaLabora.toUpperCase();

            // Agregar headers en la fila 5
            worksheet.getCell('A5').value = 'PUESTO';
            worksheet.getCell('B5').value = 'TITULAR';
            worksheet.getCell('C5').value = 'GIRO';
            worksheet.getCell('D5').value = 'DIMENSIÓN';

            // Formato para headers
            const headerRow = worksheet.getRow(5);
            headerRow.eachCell((cell) => {
                cell.font = { bold: true, color: { argb: 'FFFFFF' } };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '366092' }
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });

            let currentRow = 6;

            // Llenar datos de cada puesto
            data.forEach((registro) => {
                worksheet.getCell(`A${currentRow}`).value = registro.puesto;
                
                const titular = registro.titular === '. . ROL' ? 'ROL' : registro.titular;
                worksheet.getCell(`B${currentRow}`).value = titular;
                
                const giro = registro.giro === 'ROL' ? 'ROL' : registro.giro;
                worksheet.getCell(`C${currentRow}`).value = giro;
                
                worksheet.getCell(`D${currentRow}`).value = registro.dimension;

                // Formato numérico
                worksheet.getCell(`D${currentRow}`).numFmt = '#,##0.00';

                currentRow++;
            });

            // Generar buffer y enviar
            const buffer = await workbook.xlsx.writeBuffer();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=padron-tianguis-${nombreTianguis.replace(/\s+/g, '-')}-${fechaActual}.xlsx`);
            res.end(buffer);
        } catch (error) {
            console.error("Error generando Excel:", error);
            res.status(500).send("Error al generar reporte Excel");
        }
    }

}