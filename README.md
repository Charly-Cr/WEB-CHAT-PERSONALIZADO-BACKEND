# Proyecto de Paginas Web con su ChatBot Personalizado

## Descripción

Este es un API para paginas web con su chatbot. Incluye autenticación mediante **JWT** y se conecta a una base de datos **PostgreSQL**. Permite a los usuarios iniciar sesión, crear, listar y eliminar paginas web

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone <URL-del-repositorio>
   cd <nombre-del-repositorio>

Instala las dependencias:
npm install

Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto con las siguientes variables:

PARA TRBAJAR EN DESARROLLO:

DATABASE_URL_DEV=postgres://postgres:root@127.0.0.1:5432/chatbot_db
NODE_ENV=development
TOKEN_SECRET=tu_clave_secreta_jwt
TOKEN_EXPIRES_IN=1d  # Tiempo de expiración del token (opcional)

Inicia el servidor:

Para desarrollo local:

npm run dev

Rutas principales
POST /login: Autenticación de usuarios. Devuelve un token JWT para acceder a las rutas protegidas.

Tecnologías utilizadas
Node.js

Express

JWT (JSON Web Token) para autenticación

Sequelize para la gestión de la base de datos

PostgreSQL como motor de base de datos


Cómo probar la API
Autenticarse: Realiza una solicitud POST a /login con tus credenciales para obtener un token JWT.

Acceder a rutas protegidas: Usa el token obtenido en el paso anterior para acceder a las rutas protegidas

¡Gracias por revisar el proyecto! Si tienes alguna duda, no dudes en contactarme.