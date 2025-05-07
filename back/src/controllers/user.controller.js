import { UserModel } from "../models/user.model.js";

export class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.status(200).send(users);
    } catch (error) {
      console.error("Error in UserController.getUsers:", error);
      throw error;
    }
  }
}
