import { TarjetasModel } from "../models/tarjetas.model.js";

export class TarjetasController {
    static async getTarjetasLote(req, res) {
        const { id } = req.params
        try {
            const tarjetas_generadas_detalle = await TarjetasModel.findByIdLote(id);
            res.status(200).send(tarjetas_generadas_detalle);
        } catch (error) {
            console.error("Error in TarjetasController.getTarjetasLote:", error);
            throw error;
        }
    }
}