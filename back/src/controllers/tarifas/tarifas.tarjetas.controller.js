import { TarifasTarjetasModel } from "../../models/tarifas/tarifas.tarjetas.model.js";


export class TarifasTarjetasController {
    static async getTarifas(req, res) {
        try {
            const tarifas = await TarifasTarjetasModel.findAll();
            res.status(200).send(tarifas);
        } catch (error) {
            console.error("Error in TarifasTarjetasController.getTarifas:", error);
            throw error;
        }
    }

    static async insertTarifa(req, res) {
        const formData = req.body;
        const executeBy = req.user.Usuario
        try {
            const newTarifa = await TarifasTarjetasModel.insert(formData, executeBy);

            if (newTarifa?.Error) return res.status(409).send({ message: newTarifa.Error });

            res.status(201).send(newTarifa);
        } catch (error) {
            console.error("Error in TarifasTarjetasController.insertUser:", error);
            throw error;
        }
    }

    static async updateTarifa(req, res) {
        const tarifas = req.body
        const executeBy = req.user.Usuario
        try {
            const updatedTarifa = await TarifasTarjetasModel.update(tarifas, executeBy)
            if (updatedTarifa?.Error) return res.status(409).send({ message: updatedTarifa.Error });

            res.status(201).send(updatedTarifa);
        } catch (error) {
            console.error("Error in TarifasTarjetasController.updateTarifas:", error);
            throw error;
        }
    }

    static async deleteTarifa(req, res) {
        const { id } = req.params
        const executeBy = req.user.Usuario
        try {
            const deletedTarifa = await TarifasTarjetasModel.delete(id, executeBy)
            if (deletedTarifa?.Error) return res.status(409).send({ message: deletedTarifa.Error });

            res.status(201).send('TARIFA ELIMINADA CON ÉXITO');
        } catch (error) {
            console.error("Error in TarifasTarjetasController.deleteTarifa:", error);
            throw error;
        }
    }
}
