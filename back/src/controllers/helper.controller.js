import { HelperModel } from "../models/helper.model.js";

export class HelperController {
    static async getGroups(req, res) {
        try {
            const groups = await HelperModel.findAllGroups();
            res.status(200).send(groups);
        } catch (error) {
            console.error("Error in HelperController.getGroups:", error);
            throw error;
        }
    }

    static async getComerciantesNames(req, res) {
        try {
            const comerciantes = await HelperModel.findAllNameComerciantes();
            res.status(200).send(comerciantes);
        } catch (error) {
            console.error("Error in HelperController.getComerciantesNames:", error);
            throw error;
        }
    }

    static async updateTarjetaComerciante(req, res) {
        const { id } = req.params;
        const { tarifa, num_tarjeta } = req.body;
        const executeBy = req.user.Usuario

        try {
            const result = await HelperModel.updateTarjetaComerciante(id, tarifa, num_tarjeta, executeBy);
            if (result?.Error) return res.status(409).send({ message: result.Error });

            res.status(200).send(result);
        } catch (error) {
            console.error("Error in HelperController.updateTarjetaComerciante:", error);
            throw error;
        }
    }
}