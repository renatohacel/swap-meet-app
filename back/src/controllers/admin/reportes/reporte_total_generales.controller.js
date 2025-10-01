import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";
import { ReporteTotalGeneralesModel } from "../../../models/admin/reportes/reporte_total_generales.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ReporteTotalGeneralesController {
    static async getReporteTotalGenerales(req, res) {
        try {
            const report = await ReporteTotalGeneralesModel.findTotalGenerales();

            res.status(200).json(report);
        } catch (error) {
            console.error("Error in ReporteTotalGeneralesController:", error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async generateExcelReport(req, res) {
        try {
            const report = await ReporteTotalGeneralesModel.findTotalGenerales();
            if (!report || report.length === 0) {
                return res.status(404).send("No se encontraron datos para el reporte");
            }

            // Cargar plantilla
            const templatePath = path.join(__dirname, '../../../templates/reporte_total_generales_template.xlsx');
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(templatePath);
            const worksheet = workbook.getWorksheet(1); // Primera hoja

            // Fecha y día actual
            const now = new Date();
            const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
            const fechaActual = now.toISOString().slice(0, 10);
            const diaActual = dias[now.getDay()];
            worksheet.getCell('L2').value = fechaActual;
            worksheet.getCell('L3').value = diaActual.toUpperCase();

            // Agregar headers en la fila 5
            worksheet.getCell('A5').value = 'DÍA';
            worksheet.getCell('B5').value = 'ID';
            worksheet.getCell('C5').value = 'TIANGUIS';
            worksheet.getCell('D5').value = 'CATEGORÍA';
            worksheet.getCell('E5').value = 'COMERCIANTES';
            worksheet.getCell('F5').value = 'DIMENSIÓN';
            worksheet.getCell('G5').value = 'PISO S/INSEN';
            worksheet.getCell('H5').value = 'BASURA';
            worksheet.getCell('I5').value = 'POTENCIAL';
            worksheet.getCell('J5').value = 'TOTAL INSEN';
            worksheet.getCell('K5').value = 'PISO INSEN';
            worksheet.getCell('L5').value = 'DESC. PISO INSEN';
            worksheet.getCell('M5').value = 'METROS INSEN';

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

            // Escribir datos agrupados por día y tianguis
            report.forEach(diaObj => {
                const dia = diaObj.dia.charAt(0).toUpperCase() + diaObj.dia.slice(1);
                
                // Escribir el día solo una vez
                worksheet.getCell(`A${currentRow}`).value = dia;
                worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 12 };
                worksheet.getCell(`A${currentRow}`).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'E8F4FD' }
                };
                currentRow++;

                // Escribir todos los tianguis de este día
                diaObj.tianguis.forEach(tianguis => {
                    // Dejar la columna A vacía (el día ya está arriba)
                    worksheet.getCell(`B${currentRow}`).value = tianguis.id;
                    worksheet.getCell(`C${currentRow}`).value = tianguis.nombre;
                    worksheet.getCell(`D${currentRow}`).value = tianguis.categoria;
                    worksheet.getCell(`E${currentRow}`).value = tianguis.num_comerciantes;
                    worksheet.getCell(`F${currentRow}`).value = tianguis.dimension;
                    worksheet.getCell(`G${currentRow}`).value = tianguis.piso_sin_insen;
                    worksheet.getCell(`H${currentRow}`).value = tianguis.basura;
                    worksheet.getCell(`I${currentRow}`).value = tianguis.potencial;
                    worksheet.getCell(`J${currentRow}`).value = tianguis.total_insen;
                    worksheet.getCell(`K${currentRow}`).value = tianguis.piso_insen;
                    worksheet.getCell(`L${currentRow}`).value = tianguis.desc_piso_insen;
                    worksheet.getCell(`M${currentRow}`).value = tianguis.metros_insen;

                    // Formato numérico
                    worksheet.getCell(`F${currentRow}`).numFmt = '#,##0.00';
                    worksheet.getCell(`G${currentRow}`).numFmt = '#,##0.00';
                    worksheet.getCell(`H${currentRow}`).numFmt = '#,##0.00';
                    worksheet.getCell(`I${currentRow}`).numFmt = '#,##0.00';
                    worksheet.getCell(`J${currentRow}`).numFmt = '#,##0.00';
                    worksheet.getCell(`K${currentRow}`).numFmt = '#,##0.00';
                    worksheet.getCell(`L${currentRow}`).numFmt = '#,##0.00';
                    worksheet.getCell(`M${currentRow}`).numFmt = '#,##0.00';

                    currentRow++;
                });
                // Fila vacía entre días para mejor separación visual
                currentRow++;
            });

            // Espacio antes de totales generales (si los hay)
            currentRow += 2;

            // Aquí podrías agregar totales generales si el modelo los proporciona
            // Similar al formato del reporte INSEN

            // Descargar
            const buffer = await workbook.xlsx.writeBuffer();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=reporte-totales-generales-${fechaActual}.xlsx`);
            res.end(buffer);

        } catch (error) {
            console.error("Error generando Excel:", error);
            res.status(500).send("Error al generar reporte Excel");
        }
    }
}