const jwt = require("jsonwebtoken");

// Middleware para verificar si el token es válido
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Obtiene el token del header

  if (!token) {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // Verifica el token
    req.user = decoded; // Si el token es válido, agrega los datos del usuario a la solicitud
    next(); // Pasa al siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = authenticateUser;
