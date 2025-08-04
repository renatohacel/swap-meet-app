import { RecargasModel } from "../../models/admin/recargas.model.js";


export class RecargasController {
    static async getRecargas(req, res) {
        try {
            const recargas = await RecargasModel.findAll();
            res.status(200).send(recargas);
        } catch (error) {
            console.error("Error in RecargasController.getRecargas:", error);
            throw error;
        }
    }
}