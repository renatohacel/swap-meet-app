import { BoletosModel } from "../../models/admin/boletos.model.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import pdf from "html-pdf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class BoletosController {
    static async getBoletos(req, res) {
        try {
            const boletos = await BoletosModel.findAll();
            res.status(200).send(boletos);
        } catch (error) {
            console.error("Error in BoletosController.getBoletos:", error);
            throw error;
        }
    }

    static async generatePDF(req, res) {
        try {

            const { id } = req.params;
            const boletos = await BoletosModel.findAll(id);

            // Renderizar la plantilla EJS a HTML
            const filePath = path.join(__dirname, "../../templates/ticketsTemplate.ejs");
            const html = await ejs.renderFile(filePath, { boletos });

            // Opciones de PDF
            const options = {
                format: "A4",
                orientation: "portrait",
                border: "5mm",
                timeout: 300000,
            };

            // Crear PDF
            pdf.create(html, options).toBuffer((err, buffer) => {
                if (err) {
                    console.error("Error creando PDF:", err);
                    return res.status(500).send("Error al generar PDF");
                }

                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", "attachment; filename=boletos.pdf");
                res.send(buffer);
            });

        } catch (error) {
            console.error("Error general:", error);
            res.status(500).send("Error al generar PDF");
        }

    }
}

