import { AsignacionTianguisModel } from "../models/asignacion_tianguis.model.js";


export class AsignacionTianguisController {
    static async getListadoTianguis(req, res) {
        try {
            const tianguis = await AsignacionTianguisModel.findAll();
            res.status(200).send(tianguis);
        } catch (error) {
            console.error("Error in AsignacionTianguisController.getListadoTianguis:", error);
            throw error;
        }
    }

    static async getTianguisByUserId(req, res) {
        const { id } = req.params;
        try {
            const tianguis = await AsignacionTianguisModel.findByUserId(id);
            if (!tianguis) {
                return res.status(404).send({ message: "No tianguis found for this user." });
            }
            res.status(200).send(tianguis);

        } catch (error) {
            console.error("Error in AsignacionTianguisController.getTianguisByUserId:", error);
            throw error;
        }
    }

    static async insertTianguisToUser(req, res) {
        const { id, tianguis } = req.body;
        try {
            const result = await AsignacionTianguisModel.insertTianguisToUser(id, tianguis);
            res.status(201).send(result);
        } catch (error) {
            console.error("Error in AsignacionTianguisController.insertTianguisToUser:", error);
            throw error;
        }
    }

    static async deleteTianguisFromUser(req, res) {
        const { id, tianguis } = req.body;
        try {
            const result = await AsignacionTianguisModel.deleteTianguisFromUser(id, tianguis);
            res.status(201).send(result);
        } catch (error) {
            console.error("Error in AsignacionTianguisController.deleteTianguisFromUser:", error);
            throw error;
        }
    }
}