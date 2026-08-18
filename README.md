# Torneos de eSports API

API REST desarrollada con **Node.js**, **Express** y **MongoDB Atlas** para la administración de torneos de eSports.

El proyecto implementa una arquitectura por capas y un sistema de autenticación centralizado mediante **Passport.js**, utilizando estrategias para registro, login y consulta del usuario autenticado.

La autenticación utiliza **JWT** almacenado en una cookie **HTTP Only**, permitiendo proteger las rutas de sesión y mantener la información sensible fuera de las respuestas de la API.

---

# Arquitectura

El proyecto implementa una arquitectura por capas donde cada componente posee una responsabilidad específica.

```text
Cliente
   │
   ▼
Routes
   │
   ▼
Passport / Controllers
   │
   ▼
Repositories
   │
   ▼
DAO
   │
   ▼
Models
   │
   ▼
MongoDB
```

La autenticación se encuentra centralizada en Passport.js:

```text
POST /register
       │
       ▼
Passport Strategy "register"
       │
       ▼
UsersRepository
       │
       ▼
UsersDAO
       │
       ▼
MongoDB
```

```text
POST /login
       │
       ▼
Passport Strategy "login"
       │
       ▼
req.user
       │
       ▼
Sessions Controller
       │
       ▼
generateToken()
       │
       ▼
Cookie currentUser
```

```text
GET /current
       │
       ▼
Passport Strategy "current"
       │
       ▼
JWT desde cookie currentUser
       │
       ▼
req.user
       │
       ▼
Sessions Controller
```

Esta estructura permite mantener separadas las responsabilidades de autenticación, acceso a datos y manejo de solicitudes HTTP.

---

# Estructura del proyecto

```text
Torneos-de-eSports/
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── database.config.js
│   │   ├── environment.config.js
│   │   └── passport.config.js
│   │
│   ├── constants/
│   │   └── roles.constants.js
│   │
│   ├── controllers/
│   │   ├── events.controller.js
│   │   ├── health.controller.js
│   │   └── sessions.controller.js
│   │
│   ├── dao/
│   │   ├── events.dao.js
│   │   └── users.dao.js
│   │
│   ├── docs/
│   │
│   ├── middlewares/
│   │
│   ├── models/
│   │   ├── Event.js
│   │   └── User.js
│   │
│   ├── public/
│   │
│   ├── repositories/
│   │   ├── events.repository.js
│   │   └── users.repository.js
│   │
│   ├── routes/
│   │   ├── events.router.js
│   │   ├── health.router.js
│   │   └── sessions.router.js
│   │
│   ├── services/
│   │   └── events.service.js
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

# Responsabilidad de cada carpeta

| Carpeta           | Responsabilidad                                                                      |
| ----------------- | ------------------------------------------------------------------------------------ |
| **config/**       | Configuración de variables de entorno, conexión a MongoDB y estrategias de Passport. |
| **constants/**    | Constantes reutilizables de la aplicación.                                           |
| **controllers/**  | Manejan las solicitudes HTTP y construyen las respuestas.                            |
| **dao/**          | Gestiona el acceso directo a MongoDB mediante Mongoose.                              |
| **docs/**         | Espacio destinado a documentación técnica del proyecto.                              |
| **middlewares/**  | Espacio destinado a middlewares adicionales para futuras funcionalidades.            |
| **models/**       | Define los modelos de datos mediante Mongoose.                                       |
| **public/**       | Recursos públicos de la aplicación.                                                  |
| **repositories/** | Abstracción entre los servicios o estrategias y la capa de acceso a datos.           |
| **routes/**       | Define los endpoints de la API.                                                      |
| **services/**     | Contiene la lógica de negocio de los recursos de la aplicación.                      |
| **utils/**        | Funciones auxiliares para hash de contraseñas y manejo de JWT.                       |

---

# Tecnologías

- Node.js
- Express
- JavaScript (ES Modules)
- MongoDB Atlas
- Mongoose
- Passport.js
- Passport Local
- Passport JWT
- bcrypt
- JSON Web Token (JWT)
- cookie-parser
- dotenv

---

# Autenticación

La autenticación está centralizada mediante **Passport.js** y utiliza tres estrategias.

## Estrategia `register`

Gestiona el registro de usuarios.

La estrategia se encarga de:

- Validar campos obligatorios.
- Normalizar el email.
- Validar el formato del email.
- Validar la longitud mínima de la contraseña.
- Verificar que el email no exista.
- Hashear la contraseña mediante bcrypt.
- Crear el usuario.
- Asignar el rol `user` por defecto.
- Evitar exponer la contraseña en la respuesta.

## Estrategia `login`

Gestiona la autenticación mediante email y contraseña.

La estrategia:

- Normaliza el email.
- Busca el usuario.
- Verifica la contraseña mediante bcrypt.
- Rechaza credenciales inválidas con un mensaje genérico.
- Deja el usuario autenticado disponible en `req.user`.

Después de una autenticación exitosa, el **controller** genera el JWT y establece la cookie `currentUser`.

Passport no genera el JWT.

## Estrategia `current`

Protege la consulta del usuario autenticado.

La estrategia:

- Extrae el JWT desde la cookie `currentUser`.
- Valida la firma utilizando `JWT_SECRET`.
- Valida la expiración del token.
- Deja la información del usuario disponible en `req.user`.

La respuesta únicamente contiene:

```json
{
  "id": "...",
  "email": "...",
  "role": "user"
}
```

La contraseña nunca forma parte del JWT ni de la respuesta.

---

# Cookies

El JWT se almacena en una cookie llamada:

```text
currentUser
```

La cookie utiliza las siguientes propiedades:

```javascript
{
  httpOnly: true,
  sameSite: "lax",
  maxAge: 3600000,
  secure: env.NODE_ENV === "production"
}
```

Al utilizar `httpOnly: true`, la cookie no puede ser accedida directamente mediante JavaScript del navegador.

---

# Variables de entorno

Crear un archivo **.env** tomando como referencia `.env.example`.

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/torneos-esports
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

### Variables

| Variable         | Descripción                                    |
| ---------------- | ---------------------------------------------- |
| `PORT`           | Puerto donde se ejecuta el servidor.           |
| `NODE_ENV`       | Entorno de ejecución de la aplicación.         |
| `MONGO_URL`      | URI de conexión a MongoDB Atlas.               |
| `JWT_SECRET`     | Clave utilizada para firmar y validar los JWT. |
| `JWT_EXPIRES_IN` | Tiempo de expiración de los JWT.               |

El acceso a las variables de entorno se encuentra centralizado en:

```text
src/config/environment.config.js
```

El archivo `.env` contiene información sensible y no debe subirse al repositorio.

---

# Instalación

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

Crear el archivo `.env` tomando como referencia `.env.example`.

Iniciar el servidor:

```bash
npm run dev
```

El servidor se ejecutará por defecto en:

```text
http://localhost:3000
```

---

# Endpoints disponibles

| Método | Endpoint                 | Descripción                                  |
| ------ | ------------------------ | -------------------------------------------- |
| GET    | `/api/health`            | Verifica el estado del servidor.             |
| GET    | `/api/events`            | Devuelve la colección inicial de eventos.    |
| POST   | `/api/sessions/register` | Registra un nuevo usuario mediante Passport. |
| POST   | `/api/sessions/login`    | Autentica al usuario y genera un JWT.        |
| GET    | `/api/sessions/current`  | Devuelve el usuario autenticado.             |
| POST   | `/api/sessions/logout`   | Cierra la sesión eliminando la cookie.       |

---

# Health Check

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

# Events

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

# Registro de usuario

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

### Email duplicado

Si el email ya existe:

```json
{
  "status": "error",
  "message": "El email ya está registrado"
}
```

---

# Login

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

Después de una autenticación exitosa, el controller genera un JWT y lo almacena en la cookie HTTP Only:

```text
currentUser
```

### Credenciales inválidas

```json
{
  "status": "error",
  "message": "Credenciales inválidas"
}
```

La API mantiene un mensaje genérico para evitar revelar si el email o la contraseña son incorrectos.

---

# Usuario autenticado

## Request

```http
GET /api/sessions/current
```

La solicitud requiere una cookie `currentUser` válida obtenida durante el login.

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

### Sin token válido

Si no existe una cookie válida o el JWT fue manipulado, la ruta devuelve HTTP `401 Unauthorized`.

```text
Unauthorized
```

---

# Logout

## Request

```http
POST /api/sessions/logout
```

Esta ruta no requiere autenticación mediante Passport.

## Response

```json
{
  "status": "success",
  "message": "Sesión cerrada"
}
```

La cookie `currentUser` es eliminada.

Después del logout, una solicitud a:

```http
GET /api/sessions/current
```

devuelve:

```text
401 Unauthorized
```

---

# Seguridad

El sistema implementa las siguientes medidas:

- Autenticación centralizada mediante Passport.js.
- Estrategia independiente para registro.
- Estrategia independiente para login.
- Estrategia JWT para usuario actual.
- Contraseñas almacenadas mediante hash con bcrypt.
- Comparación segura de contraseñas.
- JWT firmado mediante `JWT_SECRET`.
- Expiración configurable mediante `JWT_EXPIRES_IN`.
- JWT almacenado en cookie HTTP Only.
- Cookie configurada con `SameSite`.
- Cookie `Secure` habilitada en producción.
- Las contraseñas nunca se incluyen en respuestas.
- Las contraseñas no forman parte del payload del JWT.
- Credenciales inválidas utilizan mensajes genéricos.
- Tokens manipulados o inválidos son rechazados con HTTP `401`.

---

# Casos de prueba

El flujo de autenticación fue probado mediante Postman:

```text
Registro
   ↓
201 Created
   ↓
Login
   ↓
200 OK
   ↓
Cookie currentUser
   ↓
GET /current
   ↓
200 OK
   ↓
Logout
   ↓
200 OK
   ↓
GET /current
   ↓
401 Unauthorized
```

También se verificaron:

- Registro con email duplicado.
- Login con credenciales inválidas.
- Acceso a `/current` sin cookie.
- Acceso a `/current` con JWT manipulado.

---

# Preparación para futuras estrategias

La configuración de Passport se encuentra centralizada en:

```text
src/config/passport.config.js
```

Esto permite incorporar futuras estrategias de autenticación sin modificar `app.js`.

El proyecto queda preparado para incorporar providers externos como:

- Google
- GitHub
- Otros proveedores OAuth

Las nuevas estrategias podrán agregarse dentro de `passport.config.js`, manteniendo la inicialización de Passport separada de la lógica específica de cada estrategia.

---

# Roadmap

Las siguientes funcionalidades se incorporarán en futuras versiones:

- Gestión completa de torneos.
- Gestión de categorías.
- Sistema de inscripciones.
- Control de cupos y reglas de negocio.
- Autorización basada en roles.
- Protección de rutas sensibles.
- Recuperación y restablecimiento de contraseña.
- Integración con providers externos.
- Documentación de la API con Swagger.
- Logging.
- Notificaciones por correo electrónico.
- Tests automatizados.
