import { LotesTarjetasModel } from "../../models/admin/lotes.model.js";

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
}