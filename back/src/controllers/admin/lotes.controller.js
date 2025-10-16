import { LotesTarjetasModel } from "../../models/admin/lotes.model.js";
import ejs from "ejs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import fs from "fs";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class LotesTarjetasController {
    static async getLotes(req, res) {
        try {
            const lotes = await LotesTarjetasModel.findAll();
            res.status(200).send(lotes);
        } catch (error) {
            console.error("Error in LotesTarjetasController.getLotes:", error);
            throw error;
        }
    }

    static async getTarjetasG(req, res) {
        const { id } = req.params
        try {
            const tarjetas_generadas = await LotesTarjetasModel.findTarjetasG(id);
            res.status(200).send(tarjetas_generadas);
        } catch (error) {
            console.error("Error in LotesTarjetasController.getTarjetasG:", error);
            throw error;
        }
    }

    static async insertLote(req, res) {
        const lote = req.body
        const executeBy = req.user.Usuario
        try {
            const newLote = await LotesTarjetasModel.insert(lote, executeBy);

            if (newLote?.Error) return res.status(409).send({ message: newLote.Error });

            res.status(201).send(newLote);
        } catch (error) {
            console.error("Error in LotesTarjetasController.insertLote:", error);
            throw error;
        }
    }

    static async deleteLote(req, res) {
        const { id } = req.params;
        const executeBy = req.user.Usuario
        try {
            const result = await LotesTarjetasModel.delete(id, executeBy);

            if (result?.Error) return res.status(409).send({ message: result.Error });

            res.status(200).send({ message: "Lote eliminado correctamente" });
        } catch (error) {
            console.error("Error in LotesTarjetasController.deleteLote:", error);
            throw error;
        }
    }

    static async generateCardsPDF(req, res) {
        const { id } = req.params;
        try {
            const startTime = Date.now();

            const cards = await LotesTarjetasModel.getLoteToPrint(id);
            if (!cards) return res.status(404).send({ message: "Lote no encontrado" });

            // Procesar en lotes de máximo 50 tarjetas para evitar sobrecarga
            const BATCH_SIZE = 50;
            const totalBatches = Math.ceil(cards.length / BATCH_SIZE);

            const filePath = path.join(__dirname, "../../templates/cards_template.ejs");
            const mediaPath = path.join(__dirname, "../../templates/media");

            // Función helper para procesar un lote de tarjetas
            const processBatch = async (batchCards, batchIndex) => {
                // Cache de imágenes para evitar lecturas repetidas
                const imageCache = {};
                
                // Función optimizada para convertir imagen a Base64
                const getImageBase64 = (color, type) => {
                    const key = `${color.toLowerCase()}-${type}`;
                    if (imageCache[key]) {
                        return imageCache[key];
                    }
                    
                    const imagePath = path.join(mediaPath, `${color.toLowerCase()}-card-${type}.jpg`);
                    try {
                        const imageBuffer = fs.readFileSync(imagePath);
                        const base64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
                        imageCache[key] = base64;
                        return base64;
                    } catch (error) {
                        console.error(`❌ Error cargando imagen: ${imagePath}`, error.message);
                        return '';
                    }
                };

                // Procesar tarjetas del lote actual
                const imageStart = Date.now();
                const processedCards = await Promise.all(batchCards.map(async (card) => {
                    // Generar QR code para el Hash con configuración optimizada
                    const qrCodeDataURL = await QRCode.toDataURL(card.Hash, {
                        width: 150, // Reducido de 200 a 150
                        margin: 0,  // Sin margen para ahorrar espacio
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF'
                        }
                    });

                    return {
                        ...card,
                        frontImage: getImageBase64(card.Color, 'front'),
                        infoImage: getImageBase64(card.Color, 'info'),
                        qrCode: qrCodeDataURL
                    };
                }));

                const renderStart = Date.now();
                const html = await ejs.renderFile(filePath, {
                    cards: processedCards
                });

                return html;
            };

            // Generar PDF por lotes
            const puppeteerStart = Date.now();
            const browser = await puppeteer.launch({
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                headless: true,
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--memory-pressure-off',
                    '--max_old_space_size=4096'
                ]
            });

            const allPDFBuffers = [];

            // Procesar cada lote con manejo de errores mejorado
            for (let i = 0; i < totalBatches; i++) {
                const startIdx = i * BATCH_SIZE;
                const endIdx = Math.min(startIdx + BATCH_SIZE, cards.length);
                const batchCards = cards.slice(startIdx, endIdx);

                const html = await processBatch(batchCards, i);

                const page = await browser.newPage();
                
                try {
                    // Configuración optimizada para PDF
                    const pageStart = Date.now();
                    await page.setContent(html, { 
                        waitUntil: "domcontentloaded",
                        timeout: 90000 // Aumentado timeout a 90 segundos
                    });

                    const pdfStart = Date.now();
                    const pdfBuffer = await page.pdf({
                        format: "LETTER",
                        printBackground: true,
                        margin: { left: "0.5cm", right: "0.5cm", top: "0.5cm", bottom: "0.5cm" },
                        timeout: 90000
                    });

                    // Validar que el buffer del lote no esté vacío
                    if (!pdfBuffer || pdfBuffer.length === 0) {
                        throw new Error(`PDF buffer del lote ${i + 1} está vacío`);
                    }

                    allPDFBuffers.push(pdfBuffer);
                    
                } finally {
                    await page.close();
                }

                // Limpiar memoria entre lotes
                if (global.gc) {
                    global.gc();
                }
            }

            await browser.close();

            // Combinar todos los PDFs en uno solo
            const combineStart = Date.now();
            
            const finalPDF = await PDFDocument.create();
            
            for (let i = 0; i < allPDFBuffers.length; i++) {
                const pdfBuffer = allPDFBuffers[i];
                const pdf = await PDFDocument.load(pdfBuffer);
                const pages = await finalPDF.copyPages(pdf, pdf.getPageIndices());
                
                pages.forEach((page) => {
                    finalPDF.addPage(page);
                });
            }
            
            const finalPDFBuffer = await finalPDF.save();

            // Validar que el buffer del PDF no esté vacío
            if (!finalPDFBuffer || finalPDFBuffer.length === 0) {
                throw new Error("PDF buffer está vacío");
            }

            // 👇 enviar el PDF combinado
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=tarjetas.pdf");
            res.setHeader("Content-Length", finalPDFBuffer.length);
            res.end(Buffer.from(finalPDFBuffer));

        } catch (error) {
            console.error("Error in LotesTarjetasController.generateCardsPDF:", error);
            
            // Asegurar que siempre se envíe una respuesta
            if (!res.headersSent) {
                res.status(500).json({ 
                    message: "Error generando PDF",
                    error: error.message 
                });
            }
        }
    }




}