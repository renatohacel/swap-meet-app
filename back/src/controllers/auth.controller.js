import { AuthModel } from "../models/auth.model.js";

export class AuthController {
  static async login(req, res) {
    //pendiente las validaciones zod
    const { username, password } = req.body;
    try {
      const user = await AuthModel.login(username, password);
      if (user.Error) return res.status(401).json({ message: user.Error });
      
      res.send(user);
    } catch (error) {

    }
  }
}
