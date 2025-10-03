const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('./models')

const app = express();

// AÑADIR ESTE BLOQUE
if (process.env.NODE_ENV === 'production') {
    // *** CAMBIO CRÍTICO AÑADIDO: Habilitar la confianza en el proxy ***
    // Esto es necesario para que Express detecte que la conexión es HTTPS 
    // y establezca correctamente el atributo 'Secure' en las cookies en sessionJWT.js. 
    app.set('trust proxy', 1);
}
// FIN DEL BLOQUE AÑADIDO

// middlewares antes de las rutas

// Configurar CORS para permitir cookies

// const allowedOrigins = [
//   'http://localhost:5173', // frontend local
//   'https://web-chat-personalizado-front.netlify.app' // frontend en producción
  
// ];

app.use(cors({
  // origin: function (origin, callback) {
  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
    origin: true,
    credentials: true // Permite el envío de cookies HTTP-only
}));


// Usar cookie-parser para parsear las cookies
app.use(cookieParser());

app.use(express.json());
app.use(helmet());


// rutas
app.use("/api/v1",router);
app.get("/", (req, res) => {
    return res.send("Child Connection API working!")
})

// middlewares después de las rutas
app.use(errorHandler)

module.exports = app;
