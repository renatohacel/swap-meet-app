import { BoletosModel } from "../../models/admin/boletos.model.js";
import ejs from "ejs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class BoletosController {
    static async getBoletos(req, res) {
        const { id } = req.params;
        try {
            const boletos = await BoletosModel.findAll(id);
            if (boletos[0].error_message) {
                return res.status(400).send(boletos[0].error_message);
            }
            res.status(200).send(boletos);
        } catch (error) {
            console.error("Error in BoletosController.getBoletos:", error);
            throw error;
        }
    }

    static async generatePDF(req, res) {
        try {
            const { id } = req.params;
            const { fecha } = req.query;
            const boletos = await BoletosModel.findAll(id, fecha);

            if (boletos[0].error_message) {
                return res.status(400).send(boletos[0].error_message);
            }

            const filePath = path.join(__dirname, "../../templates/boleto_template_example.ejs");
            const html = await ejs.renderFile(filePath, { boletos });

            const browser = await puppeteer.launch({
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                headless: true,
            });

            const page = await browser.newPage();

            // aumentar timeout global
            page.setDefaultTimeout(300000);

            // cargar contenido
            await page.setContent(html, { waitUntil: "networkidle0", timeout: 0 });

            const pdfBuffer = await page.pdf({
                format: "LETTER",
                printBackground: true,
                margin: { left: "0.8cm", right: "0.8cm", top: "0.35cm", bottom: "0.35cm" },
            });

            await browser.close();

            // 👇 enviar el PDF correctamente
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=boletos.pdf");
            res.end(pdfBuffer);

        } catch (error) {
            console.error("Error generando PDF:", error);
            res.status(500).send("Error al generar PDF");
        }
    }
}

