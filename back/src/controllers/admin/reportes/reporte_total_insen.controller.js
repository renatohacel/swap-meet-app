import { ReporteTotalInsenModel } from "../../../models/admin/reportes/reporte_total_insen.model.js";
import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ReporteTotalInsenController {
    static async getReporteTotalInsen(req, res) {
        try {
            const report = await ReporteTotalInsenModel.findTotalInsen();
            res.status(200).send(report);
        } catch (error) {
            console.error("Error in ReporteTotalInsenController:", error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    static async generateExcelReport(req, res) {
        try {
            const report = await ReporteTotalInsenModel.findTotalInsen();
            if (!report || report.length === 0) {
                return res.status(404).send("No se encontraron datos para el reporte");
            }

            // Cargar plantilla Excel
            const templatePath = path.join(__dirname, '../../../templates/reporte_total_insen_template.xlsx');
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(templatePath);
            const worksheet = workbook.getWorksheet(1);


            // Fecha y día actual
            const now = new Date();
            const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
            const fechaActual = now.toISOString().slice(0, 10);
            const diaActual = dias[now.getDay()];
            worksheet.getCell('F2').value = fechaActual;
            worksheet.getCell('F3').value = diaActual.toUpperCase();

            // Agregar headers en la fila 5
            worksheet.getCell('A5').value = 'ID';
            worksheet.getCell('B5').value = 'TIANGUIS';
            worksheet.getCell('C5').value = 'CATEGORÍA';
            worksheet.getCell('D5').value = 'NO. COMERCIANTES';
            worksheet.getCell('E5').value = 'DIMENSIÓN';
            worksheet.getCell('F5').value = 'PISO';
            worksheet.getCell('G5').value = 'BASURA';

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

            // Llenar datos de cada tianguis
            report.forEach((item) => {
                worksheet.getCell(`A${currentRow}`).value = item.id_tianguis;
                worksheet.getCell(`B${currentRow}`).value = item.tianguis;
                worksheet.getCell(`C${currentRow}`).value = item.categoria;
                worksheet.getCell(`D${currentRow}`).value = item.no_comerciantes;
                worksheet.getCell(`E${currentRow}`).value = item.total_dimension;
                worksheet.getCell(`F${currentRow}`).value = item.total_piso;
                worksheet.getCell(`G${currentRow}`).value = item.total_basura;

                // Formato numérico
                worksheet.getCell(`E${currentRow}`).numFmt = '#,##0.00';
                worksheet.getCell(`F${currentRow}`).numFmt = '#,##0.00';
                worksheet.getCell(`G${currentRow}`).numFmt = '#,##0.00';

                currentRow++;
            });

            // Espacio antes de totales generales
            currentRow += 2;

            // Tomar los totales generales del primer objeto
            const general = report[0];
            worksheet.getCell(`C${currentRow}`).value = 'TOTALES GENERALES';
            worksheet.getCell(`D${currentRow}`).value = general.total_general_no_comerciantes;
            worksheet.getCell(`E${currentRow}`).value = general.total_general_dimension;
            worksheet.getCell(`F${currentRow}`).value = general.total_general_piso;
            worksheet.getCell(`G${currentRow}`).value = general.total_general_basura;

            // Formato para totales generales
            const totalRow = worksheet.getRow(currentRow);
            totalRow.eachCell((cell) => {
                cell.font = { bold: true, color: { argb: 'FFFFFF' } };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '2980B9' }
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });
            worksheet.getCell(`E${currentRow}`).numFmt = '#,##0.00';
            worksheet.getCell(`F${currentRow}`).numFmt = '#,##0.00';
            worksheet.getCell(`G${currentRow}`).numFmt = '#,##0.00';

            // Generar buffer y enviar
            const buffer = await workbook.xlsx.writeBuffer();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=reporte-total-insen-${fechaActual}.xlsx`);
            res.end(buffer);
        } catch (error) {
            console.error("Error generando Excel:", error);
            res.status(500).send("Error al generar reporte Excel");
        }
    }
}