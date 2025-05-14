import { TarifasTarjetasModel } from "../../models/tarifas/tarifas.tarjetas.model.js";


export class TarifasTarjetasController {
    static async getTarifas(req, res) {
        try {
            const tarifas = await TarifasTarjetasModel.findAll();
            res.status(200).send(tarifas);
        } catch (error) {
            console.error("Error in PuestosController.getTarifas:", error);
            throw error;
        }
    }

    // static async updateTarifas(req, res) {
    //     const tarifas = req.body
    //     try {
    //         const updatedTarifas = await PuestosModel.update(tarifas)
    //         if (updatedTarifas?.Error) return res.status(409).send({ message: updatedTarifas.Error });

    //         res.status(201).send(updatedTarifas);
    //     } catch (error) {
    //         console.error("Error in PuestosController.updateTarifas:", error);
    //         throw error;
    //     }
    // }
}
