import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data; // Guarda los datos del usuario en req.user para usarlos en las rutas
    next();
  } catch (err) {
    console.error("Error verificando token:", err.message);
    return res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};