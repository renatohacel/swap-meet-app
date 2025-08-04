import { UserModel } from "../../models/catalogs/user.model.js";

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

  static async getActiveUsers(req, res) {
    try {
      const usersActives = await UserModel.findAllActive();
      res.status(200).send(usersActives);
    } catch (error) {
      console.error("Error in UserController.getActiveUsers:", error);
      throw error;
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).send({ message: "User not found" });
      res.status(200).send(user);
    } catch (error) {
      console.error("Error in UserController.getUserById:", error);
      throw error;
    }
  }

  static async insertUser(req, res) {
    const formData = req.body;
    const executeBy = req.user.Usuario
    try {
      const newUser = await UserModel.insert(formData, executeBy);

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
    const executeBy = req.user.Usuario

    try {
      const updatedUser = await UserModel.update(id, user, executeBy)
      if (updatedUser?.Error) return res.status(409).send({ message: updatedUser.Error });

      res.status(201).send(updatedUser);
    } catch (error) {
      console.error("Error in UserController.updateUser:", error);
      throw error;
    }
  }

  static async updatePassword(req, res) {
    const passwords = req.body
    const userId = req.user.IdUsuario

    if (userId !== passwords.id) {
      return res.status(403).send({ message: "You can only change your own password" });
    }

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
