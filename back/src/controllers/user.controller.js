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

  static async insertUser(req, res) {
    const formData = req.body;
    try {
      const newUser = await UserModel.insert(formData);

      if (newUser?.Error) return res.status(409).send({ message: newUser.Error });

      res.status(201).send(newUser);
    } catch (error) {
      console.error("Error in UserController.insertUser:", error);
      throw error;
    }

  }

  static async updateUser(req, res) {
    const { id } = req.params
    const user = req.body
    try {
      const updatedUser = await UserModel.update(id, user)
      if (updatedUser?.Error) return res.status(409).send({ message: updatedUser.Error });

      res.status(201).send(updatedUser);
    } catch (error) {
      console.error("Error in UserController.updateUser:", error);
      throw error;
    }
  }

  static async updatePassword(req, res) {
    const passwords = req.body
    console.log(passwords)
    try {
      const updatedPassword = await UserModel.updatePassword(passwords)
      if (updatedPassword?.Error) return res.status(409).send({ message: updatedPassword.Error });

      res.status(201).send(updatedPassword);
    } catch (error) {
      console.error("Error in UserController.updatePassword:", error);
      throw error;
    }
  }
}
