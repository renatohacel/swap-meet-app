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

    static async cancelTarjeta(req, res) {
        const executeBy = req.user.Usuario
        const { id } = req.params
        try {
            const result = await TarjetasModel.cancelById(id, executeBy);
            if (result?.Error) return res.status(409).send({ message: result.Error });

            res.status(200).send(result);
        } catch (error) {
            console.error("Error in TarjetasController.cancelTarjeta:", error);
            res.status(500).send({ error: "Error al cancelar la tarjeta" });
        }
    }


}