const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('./models')

const app = express();

// middlewares antes de las rutas

// Configurar CORS para permitir cookies
const allowedOrigins = [
  'http://localhost:5173', // frontend local
  'https://web-chat-personalizado-front.netlify.app' // frontend en producción
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
