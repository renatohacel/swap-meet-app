import { HistoryModel } from "../../models/history/history.model.js";

export class HistoryController {
    static async getHistory(req, res) {
        try {
            const history = await HistoryModel.findAll();
            res.status(200).send(history);
        } catch (error) {
            console.error("Error in HistoryController.getHistory:", error);
            throw error;
        }
    }
}