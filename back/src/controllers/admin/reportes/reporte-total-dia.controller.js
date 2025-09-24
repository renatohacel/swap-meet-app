import { ReporteTotalDiaModel } from "../../../models/admin/reportes/reporte-total-dia.model.js";
import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export class ReporteTotalDiaController {
    static async getReporteTotalDia(req, res) {
        try {
            const { dia_semana, fecha } = req.query;

            if (!dia_semana || !fecha) {
                return res.status(400).json({ error: 'dia_semana y fecha son requeridos' });
            }

            const report = await ReporteTotalDiaModel.findTotalDia(dia_semana, fecha);

            res.status(200).json(report);

        } catch (error) {
            console.error("Error in ReporteTotalDiaController:", error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async generateExcelReport(req, res) {
        try {
            const { dia_semana, fecha } = req.query;

            if (!fecha || !dia_semana) {
                return res.status(400).send("Fecha y día son requeridos");
            }

            const report = await ReporteTotalDiaModel.findTotalDia(dia_semana, fecha);

            if (report[0]?.error_message) {
                return res.status(400).send(report[0].error_message);
            }

            // 📁 Cargar tu plantilla Excel existenteback\src\templates\reporte_totales_template.xlsx
            const templatePath = path.join(__dirname, "../../../templates/reporte_totales_template.xlsx");
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(templatePath);

            // Obtener la hoja de trabajo
            const worksheet = workbook.getWorksheet(1);

            // 📝 Llenar datos en celdas específicas (fecha y día)
            worksheet.getCell('G2').value = fecha;
            worksheet.getCell('G3').value = dia_semana.toUpperCase();

            // Agregar headers de columna en la fila 5
            worksheet.getCell('A5').value = 'TIANGUIS';
            worksheet.getCell('B5').value = 'UBICACIÓN';
            worksheet.getCell('C5').value = 'PISO RECAUDADO';
            worksheet.getCell('D5').value = 'PISO M²';
            worksheet.getCell('E5').value = 'BASURA RECAUDADO';
            worksheet.getCell('F5').value = 'BASURA M²';
            worksheet.getCell('G5').value = 'TOTAL RECAUDADO';
            worksheet.getCell('H5').value = 'TOTAL M²';

            // Opcional: formato para headers
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

            let currentRow = 6; // Fila donde empiezan los datos (ajusta según tu plantilla)

            // 🔄 Iterar sobre TODOS los tianguis en el arreglo
            report.forEach((tianguis, tianguisIndex) => {
                // Guardar la fila inicial de este tianguis para merge posterior
                const tianguisStartRow = currentRow;

                // 📋 Llenar líneas del tianguis actual
                tianguis.lineas.forEach((linea, lineaIndex) => {
                    // Solo escribir el nombre del tianguis en la primera línea
                    if (lineaIndex === 0) {
                        worksheet.getCell(`A${currentRow}`).value = tianguis.tianguis;
                    }

                    // Llenar datos de la línea
                    worksheet.getCell(`B${currentRow}`).value = linea.ubicacion.toUpperCase();
                    worksheet.getCell(`C${currentRow}`).value = linea.piso_recaudado;
                    worksheet.getCell(`D${currentRow}`).value = linea.piso_metros;
                    worksheet.getCell(`E${currentRow}`).value = linea.basura_recaudado;
                    worksheet.getCell(`F${currentRow}`).value = linea.basura_metros;
                    worksheet.getCell(`G${currentRow}`).value = linea.totales_recaudado;
                    worksheet.getCell(`H${currentRow}`).value = linea.totales_metro;

                    currentRow++;
                });

                // 🧮 Agregar fila de subtotales del tianguis actual
                if (tianguis.subtotales && tianguis.subtotales.length > 0) {
                    const subtotal = tianguis.subtotales[0];

                    // Escribir "SUBTOTAL" en la columna de ubicación
                    worksheet.getCell(`B${currentRow}`).value = "SUBTOTAL";
                    worksheet.getCell(`C${currentRow}`).value = subtotal.subtotal_piso_recaudado;
                    worksheet.getCell(`E${currentRow}`).value = subtotal.subtotal_basura_recaudado;
                    worksheet.getCell(`G${currentRow}`).value = subtotal.subtotal_totales_recaudado;

                    // Aplicar formato de subtotal (negrita y fondo gris)
                    const subtotalRow = worksheet.getRow(currentRow);
                    subtotalRow.eachCell((cell) => {
                        cell.font = { bold: true };
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'F0F0F0' }
                        };
                    });

                    currentRow++;
                }

                // 🔗 Merge celdas del nombre del tianguis si tiene múltiples líneas
                if (tianguis.lineas.length > 1) {
                    const endRow = currentRow - 2; // -2 porque currentRow ya se incrementó y no incluimos subtotal
                    if (endRow > tianguisStartRow) {
                        worksheet.mergeCells(`A${tianguisStartRow}:A${endRow}`);

                        // Centrar el texto del tianguis vertical y horizontalmente
                        worksheet.getCell(`A${tianguisStartRow}`).alignment = {
                            vertical: 'middle',
                            horizontal: 'center'
                        };
                    }
                }

                // ➕ Agregar fila vacía entre tianguis (excepto en el último)
                if (tianguisIndex < report.length - 1) {
                    currentRow++;
                }
            });

            // 📊 Agregar totales generales al final (opcional)
            currentRow += 2; // Espacio adicional

            // Calcular totales generales
            let totalGeneral_piso = 0;
            let totalGeneral_basura = 0;
            let totalGeneral_total = 0;

            report.forEach(tianguis => {
                if (tianguis.subtotales && tianguis.subtotales.length > 0) {
                    totalGeneral_piso += tianguis.subtotales[0].subtotal_piso_recaudado;
                    totalGeneral_basura += tianguis.subtotales[0].subtotal_basura_recaudado;
                    totalGeneral_total += tianguis.subtotales[0].subtotal_totales_recaudado;
                }
            });

            // Escribir totales generales
            worksheet.getCell(`B${currentRow}`).value = "TOTAL GENERAL";
            worksheet.getCell(`C${currentRow}`).value = totalGeneral_piso;
            worksheet.getCell(`E${currentRow}`).value = totalGeneral_basura;
            worksheet.getCell(`G${currentRow}`).value = totalGeneral_total;

            // Formato para total general (negrita y fondo azul)
            const totalRow = worksheet.getRow(currentRow);
            totalRow.eachCell((cell) => {
                cell.font = { bold: true, color: { argb: 'FFFFFF' } };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '366092' }
                };
            });

            // 💾 Generar buffer del Excel modificado
            const buffer = await workbook.xlsx.writeBuffer();

            // Configurar headers de respuesta
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=reporte-totales-${fecha}.xlsx`);
            res.end(buffer);

        } catch (error) {
            console.error("Error generando Excel:", error);
            res.status(500).send("Error al generar reporte Excel");
        }
    }
}