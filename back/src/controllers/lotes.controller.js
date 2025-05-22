import { LotesTarjetasModel } from "../models/lotes.model.js";

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
        try {
            const newLote = await LotesTarjetasModel.insert(lote);

            if (newLote?.Error) return res.status(409).send({ message: newLote.Error });

            res.status(201).send(newLote);
        } catch (error) {
            console.error("Error in LotesTarjetasController.insertLote:", error);
            throw error;
        }
    }
}