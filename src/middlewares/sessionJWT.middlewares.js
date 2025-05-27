const jwt = require('jsonwebtoken')

const sessionJWT = (req, res, next) => {

  const user = req.userlogged

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" }
);
// Enviar token en una cookie HTTP-only
res.cookie("token", token, {
    httpOnly: true,  // Evita acceso desde JavaScript
    secure: process.env.NODE_ENV === "production",   // Solo en HTTPS si está en producción
    sameSite: "None",   // Controla el envío entre sitios
    path: "/", // Hace que la cookie sea accesible en toda la app
    maxAge: 86400000, // 1 día
});
next();
};
module.exports = sessionJWT
