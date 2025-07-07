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
}