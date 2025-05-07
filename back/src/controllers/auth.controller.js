import jwt from "jsonwebtoken";
import { AuthModel } from "../models/auth.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await AuthModel.login(username, password);

      if (user.Error) return res.status(401).send({ message: user.Error });

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "8h" });

      // Configuración específica para desarrollo
      const cookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 8 * 60 * 60 * 1000,
      };

      res.cookie("access_token", token, cookieOptions).send({ user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send({ message: "Error interno del servidor" });
    }
  }

  static async logout(req, res) {
    res.clearCookie("access_token").send({ message: "logout success" });
  }


  //PRUEBA RUTA PROTEGIDA
  // static async prueba(req, res) {
  //   res.send({ user: req.user }); // req.user contiene los datos del usuario
  // }
}
