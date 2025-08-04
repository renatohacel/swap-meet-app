import { InsenModel } from "../../models/admin/insen.model.js";

export class InsenController {

    static async getInsenById(req, res) {
        const { id } = req.params;
        try {
            const insen = await InsenModel.findInsenForId(id);
            res.status(200).send(insen);
        } catch (error) {
            console.error("Error in InsenController.getInsenById:", error);
            throw error;
        }
    }


    static async updateInsen(req, res) {
        const { id } = req.params;
        const { movimiento } = req.body;
        const executeBy = req.user.Usuario
        try {
            const updatedInsen = await InsenModel.updateInsen(id, movimiento, executeBy);
            if (updatedInsen?.Error) return res.status(409).send({ message: updatedInsen.Error });

            res.status(200).send(updatedInsen);
        } catch (error) {
            console.error("Error in InsenController.updateInsen:", error);
            throw error;
        }
    }
}