# 🎮 Torneos de eSports API

API REST desarrollada con **Node.js**, **Express** y **MongoDB Atlas** para la administración de torneos de eSports.

El proyecto implementa una arquitectura por capas y actualmente permite registrar usuarios, iniciar sesión mediante JWT almacenado en una cookie HTTP Only, consultar el usuario autenticado y cerrar sesión de forma segura.

---

# 🏗 Arquitectura

El proyecto implementa una arquitectura por capas donde cada componente posee una única responsabilidad.

```text
Cliente
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
DAO
   │
   ▼
MongoDB
```

Esta estructura desacopla las responsabilidades de la aplicación, facilitando el mantenimiento, la escalabilidad y la incorporación de nuevas funcionalidades.

---

# 📂 Estructura del proyecto

```text
Torneos-de-eSports/
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── database.config.js
│   │   └── environment.config.js
│   │
│   ├── constants/
│   ├── controllers/
│   │   └── sessions.controller.js
│   │
│   ├── dao/
│   │   └── users.dao.js
│   │
│   ├── docs/
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── public/
│   │
│   ├── repositories/
│   │   └── users.repository.js
│   │
│   ├── routes/
│   │   ├── events.router.js
│   │   ├── health.router.js
│   │   └── sessions.router.js
│   │
│   ├── services/
│   │   └── sessions.service.js
│   │
│   └── utils/
│       ├── hash.js
│       └── jwt.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# 📚 Responsabilidad de cada carpeta

| Carpeta           | Responsabilidad                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| **config/**       | Configuración de variables de entorno y conexión a la base de datos.         |
| **constants/**    | Constantes reutilizables de la aplicación.                                   |
| **controllers/**  | Reciben las solicitudes HTTP y delegan la lógica de negocio a los servicios. |
| **dao/**          | Gestiona el acceso directo a MongoDB mediante Mongoose.                      |
| **docs/**         | Espacio destinado a documentación técnica del proyecto.                      |
| **middlewares/**  | Contiene middlewares reutilizables, como autenticación mediante JWT.         |
| **models/**       | Define los modelos de datos mediante Mongoose.                               |
| **public/**       | Recursos públicos de la aplicación.                                          |
| **repositories/** | Intermediario entre los servicios y la capa de acceso a datos.               |
| **routes/**       | Define los endpoints de la API.                                              |
| **services/**     | Implementa la lógica de negocio de la aplicación.                            |
| **utils/**        | Funciones auxiliares para hash de contraseñas y manejo de JWT.               |

---

# 🚀 Tecnologías

- Node.js
- Express
- JavaScript (ES Modules)
- MongoDB Atlas
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- cookie-parser
- dotenv

---

# ⚙ Variables de entorno

Crear un archivo **.env** tomando como referencia el archivo **.env.example**.

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/torneos-esports
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

---

# ▶ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Gomez-Dev/Torneos-de-eSports.git
```

Ingresar al directorio del proyecto:

```bash
cd Torneos-de-eSports
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm run dev
```

---

# 🌐 Endpoints disponibles

| Método | Endpoint                 | Descripción                                                       |
| ------ | ------------------------ | ----------------------------------------------------------------- |
| GET    | `/api/health`            | Verifica el estado del servidor.                                  |
| GET    | `/api/events`            | Devuelve la colección inicial de eventos.                         |
| POST   | `/api/sessions/register` | Registra un nuevo usuario.                                        |
| POST   | `/api/sessions/login`    | Inicia sesión y genera un JWT almacenado en una cookie HTTP Only. |
| GET    | `/api/sessions/current`  | Devuelve el usuario autenticado.                                  |
| POST   | `/api/sessions/logout`   | Cierra la sesión eliminando la cookie de autenticación.           |

---

# ❤️ Health Check

## Request

```http
GET /api/health
```

## Response

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

---

# 📅 Events

## Request

```http
GET /api/events
```

## Response

```json
{
  "status": "success",
  "payload": []
}
```

---

# 👤 Registro de usuario

## Request

```http
POST /api/sessions/register
```

### Body

```json
{
  "first_name": "José",
  "last_name": "Gómez",
  "email": "jose@gmail.com",
  "password": "12345678"
}
```

## Response

```json
{
  "status": "success",
  "payload": {
    "id": "...",
    "first_name": "José",
    "last_name": "Gómez",
    "email": "jose@gmail.com",
    "role": "user"
  }
}
```

---

# 🔐 Login

## Request

```http
POST /api/sessions/login
```

### Body

```json
{
  "email": "jose@gmail.com",
  "password": "12345678"
}
```

## Response

```json
{
  "status": "success",
  "message": "Login correcto"
}
```

Al iniciar sesión correctamente, el servidor genera un **JWT** y lo almacena en una cookie **HTTP Only** llamada **currentUser**.

---

# 🙋 Usuario autenticado

## Request

```http
GET /api/sessions/current
```

Requiere la cookie **currentUser** generada durante el login.

## Response

```json
{
  "status": "success",
  "payload": {
    "id": "...",
    "email": "jose@gmail.com",
    "role": "user"
  }
}
```

Si el usuario no está autenticado:

```json
{
  "status": "error",
  "message": "No autenticado"
}
```

---

# 🚪 Logout

## Request

```http
POST /api/sessions/logout
```

## Response

```json
{
  "status": "success",
  "message": "Sesión cerrada"
}
```

La cookie **currentUser** es eliminada del navegador.

---

# ✅ Validaciones implementadas

- Validación de campos obligatorios.
- Validación del formato del email.
- Normalización automática del email (`trim()` + `lowercase()`).
- Prevención de usuarios duplicados.
- Hash de contraseñas mediante **bcrypt**.
- Comparación segura de contraseñas.
- Generación de JWT firmado mediante `JWT_SECRET`.
- Cookie HTTP Only para autenticación.
- Middleware de autenticación para proteger rutas.
- La contraseña nunca se almacena ni se devuelve en texto plano.

---

# 🔮 Roadmap

Las siguientes funcionalidades se incorporarán en futuras versiones:

- Gestión completa de torneos.
- Gestión de categorías.
- Sistema de inscripciones.
- Control de cupos y reglas de negocio.
- Autorización basada en roles.
- Recuperación y restablecimiento de contraseña.
- Documentación de la API con Swagger.
- Logging.
- Notificaciones por correo electrónico.
- Tests automatizados.
