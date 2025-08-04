import { TarifasPuestosModel } from "../../../models/catalogs/tarifas/tarifas.puestos.model.js";


export class TarifasPuestosController {
    static async getTarifas(req, res) {
        try {
            const tarifas = await TarifasPuestosModel.findAll();
            res.status(200).send(tarifas);
        } catch (error) {
            console.error("Error in PuestosController.getTarifas:", error);
            throw error;
        }
    }

    static async updateTarifas(req, res) {
        const tarifas = req.body
        const executeBy = req.user.Usuario
        try {
            const updatedTarifas = await TarifasPuestosModel.update(tarifas, executeBy)
            if (updatedTarifas?.Error) return res.status(409).send({ message: updatedTarifas.Error });

            res.status(201).send(updatedTarifas);
        } catch (error) {
            console.error("Error in PuestosController.updateTarifas:", error);
            throw error;
        }
    }
}
