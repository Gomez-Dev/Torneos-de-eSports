# Torneos de eSports API

API REST desarrollada con Node.js, Express y MongoDB Atlas para la administración de una plataforma de eventos y torneos de eSports.

El proyecto implementa una arquitectura por capas y un sistema de autenticación y autorización basado en JWT y roles. Actualmente permite registrar usuarios, iniciar y cerrar sesión, consultar el usuario autenticado, consultar eventos y administrar eventos según los permisos correspondientes.

---

# Arquitectura

El proyecto implementa una arquitectura por capas donde cada componente posee una única responsabilidad.

```text
Cliente
   │
   ▼
Routes
   │
   ▼
Middlewares
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

Esta estructura permite desacoplar las responsabilidades de la aplicación, facilitando el mantenimiento, la escalabilidad y la incorporación de nuevas funcionalidades.

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
│   │   ├── sessions.controller.js
│   │   └── users.controller.js
│   │
│   ├── dao/
│   │   ├── events.dao.js
│   │   ├── sessions.dao.js
│   │   └── users.dao.js
│   │
│   ├── docs/
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── authorize.middleware.js
│   │
│   ├── models/
│   │   ├── Event.js
│   │   └── User.js
│   │
│   ├── public/
│   │
│   ├── repositories/
│   │   ├── events.repository.js
│   │   ├── sessions.repository.js
│   │   └── users.repository.js
│   │
│   ├── routes/
│   │   ├── events.router.js
│   │   ├── health.router.js
│   │   ├── sessions.router.js
│   │   └── users.router.js
│   │
│   ├── services/
│   │   ├── events.service.js
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

# Responsabilidad de cada carpeta

| Carpeta         | Responsabilidad                                                              |
| --------------- | ---------------------------------------------------------------------------- |
| `config/`       | Configuración de variables de entorno, base de datos y Passport.             |
| `constants/`    | Constantes reutilizables de la aplicación, incluyendo los roles del sistema. |
| `controllers/`  | Reciben las solicitudes HTTP y coordinan la ejecución de los servicios.      |
| `dao/`          | Gestionan el acceso directo a MongoDB mediante Mongoose.                     |
| `docs/`         | Espacio destinado a documentación técnica.                                   |
| `middlewares/`  | Contienen middlewares reutilizables para autenticación y autorización.       |
| `models/`       | Definen los modelos de datos mediante Mongoose.                              |
| `public/`       | Recursos públicos de la aplicación.                                          |
| `repositories/` | Actúan como intermediarios entre los servicios y los DAO.                    |
| `routes/`       | Definen los endpoints de la API y aplican los middlewares correspondientes.  |
| `services/`     | Implementan la lógica de negocio de la aplicación.                           |
| `utils/`        | Contienen funciones auxiliares para hash de contraseñas y manejo de JWT.     |

---

# Tecnologías

- Node.js
- Express
- JavaScript (ES Modules)
- MongoDB Atlas
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- cookie-parser
- dotenv
- Passport

---

# Variables de entorno

Crear un archivo `.env` tomando como referencia `.env.example`.

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/torneos-esports
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

El acceso a las variables de entorno se centraliza mediante `environment.config.js`.

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

Iniciar el servidor:

```bash
npm run dev
```

El servidor se ejecuta por defecto en:

```text
http://localhost:3000
```

---

# Roles

La API utiliza un sistema de autorización basado en tres roles:

| Rol         | Descripción                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| `user`      | Usuario autenticado con permisos básicos.                                           |
| `organizer` | Usuario autorizado para crear y administrar sus propios eventos.                    |
| `admin`     | Usuario con permisos administrativos y capacidad para administrar cualquier evento. |

El rol asignado por defecto al registrarse públicamente es `user`.

El registro público no permite establecer directamente los roles `organizer` o `admin` mediante el body de la solicitud.

---

# Matriz de permisos

| Acción                        | `user` | `organizer` | `admin` |
| ----------------------------- | :----: | :---------: | :-----: |
| Consultar eventos publicados  |   Sí   |     Sí      |   Sí    |
| Crear eventos                 |   No   |     Sí      |   Sí    |
| Modificar eventos propios     |   No   |     Sí      |   Sí    |
| Eliminar eventos propios      |   No   |     Sí      |   Sí    |
| Modificar cualquier evento    |   No   |     No      |   Sí    |
| Eliminar cualquier evento     |   No   |     No      |   Sí    |
| Ver todos los usuarios        |   No   |     No      |   Sí    |
| Consultar usuario autenticado |   Sí   |     Sí      |   Sí    |

---

# Autenticación

La autenticación se realiza mediante JWT.

Después de iniciar sesión correctamente, el servidor genera un JWT y lo almacena en una cookie HTTP Only llamada:

```text
currentUser
```

El middleware `auth.middleware.js` obtiene el token desde esta cookie, lo valida y almacena la información del usuario autenticado en:

```javascript
req.user;
```

Las rutas que requieren autenticación utilizan este middleware antes de ejecutar la lógica correspondiente.

---

# Autorización

La autorización se implementa mediante el middleware reutilizable:

```text
src/middlewares/authorize.middleware.js
```

El middleware recibe los roles permitidos como parámetros y compara dichos roles con el rol almacenado en `req.user`.

Ejemplo:

```javascript
router.post("/", auth, authorize(ROLES.ORGANIZER, ROLES.ADMIN), createEvent);
```

De esta forma, la autorización se realiza mediante middleware y no directamente dentro de las rutas.

---

# Diferencia entre 401 y 403

La API diferencia correctamente los errores de autenticación y autorización.

## 401 Unauthorized

Se devuelve cuando el usuario no posee una sesión válida.

Por ejemplo, al acceder a una ruta privada sin la cookie `currentUser`:

```json
{
  "status": "error",
  "message": "No autenticado"
}
```

## 403 Forbidden

Se devuelve cuando el usuario está autenticado pero su rol no posee permisos suficientes para realizar la acción.

Ejemplo:

```json
{
  "status": "error",
  "message": "No tenés permisos para realizar esta acción"
}
```

La API no utiliza `500 Internal Server Error` para estos casos.

---

# Rutas protegidas

| Método | Endpoint                | Autenticación | Roles permitidos       | Descripción                            |
| ------ | ----------------------- | :-----------: | ---------------------- | -------------------------------------- |
| GET    | `/api/sessions/current` |      Sí       | Todos los autenticados | Obtiene el usuario autenticado.        |
| POST   | `/api/events`           |      Sí       | `organizer`, `admin`   | Crea un nuevo evento.                  |
| PUT    | `/api/events/:id`       |      Sí       | `organizer`, `admin`   | Modifica un evento según sus permisos. |
| DELETE | `/api/events/:id`       |      Sí       | `organizer`, `admin`   | Elimina un evento según sus permisos.  |
| GET    | `/api/users`            |      Sí       | `admin`                | Obtiene todos los usuarios.            |

---

# Endpoints disponibles

| Método | Endpoint                 | Descripción                                         |
| ------ | ------------------------ | --------------------------------------------------- |
| GET    | `/api/health`            | Verifica el estado del servidor.                    |
| GET    | `/api/events`            | Obtiene los eventos disponibles.                    |
| POST   | `/api/sessions/register` | Registra un nuevo usuario.                          |
| POST   | `/api/sessions/login`    | Inicia sesión y genera el JWT.                      |
| GET    | `/api/sessions/current`  | Obtiene el usuario autenticado.                     |
| POST   | `/api/sessions/logout`   | Cierra la sesión.                                   |
| POST   | `/api/events`            | Crea un evento. Requiere `organizer` o `admin`.     |
| PUT    | `/api/events/:id`        | Modifica un evento. Requiere `organizer` o `admin`. |
| DELETE | `/api/events/:id`        | Elimina un evento. Requiere `organizer` o `admin`.  |
| GET    | `/api/users`             | Obtiene todos los usuarios. Requiere `admin`.       |

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

## Consultar eventos

```http
GET /api/events
```

## Crear evento

```http
POST /api/events
```

Requiere autenticación y rol `organizer` o `admin`.

### Body

```json
{
  "title": "Torneo de eSports",
  "description": "Torneo competitivo de prueba",
  "category": "eSports",
  "date": "2026-09-15",
  "location": "Buenos Aires",
  "capacity": 100,
  "status": "published"
}
```

### Response

```json
{
  "status": "success",
  "payload": {
    "title": "Torneo de eSports",
    "description": "Torneo competitivo de prueba",
    "category": "eSports",
    "date": "2026-09-15T00:00:00.000Z",
    "location": "Buenos Aires",
    "capacity": 100,
    "status": "published",
    "organizer": "..."
  }
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

El registro público asigna automáticamente el rol:

```text
user
```

### Response

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

### Response

```json
{
  "status": "success",
  "message": "Login correcto"
}
```

Al iniciar sesión correctamente, el servidor genera un JWT firmado mediante `JWT_SECRET` y lo almacena en una cookie HTTP Only llamada `currentUser`.

---

# Usuario autenticado

## Request

```http
GET /api/sessions/current
```

Requiere una sesión válida.

### Response

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

Si no existe una sesión válida:

```json
{
  "status": "error",
  "message": "No autenticado"
}
```

---

# Administración de usuarios

## Request

```http
GET /api/users
```

Esta ruta requiere autenticación y rol `admin`.

Un usuario con rol `user` u `organizer` recibe:

```text
403 Forbidden
```

```json
{
  "status": "error",
  "message": "No tenés permisos para realizar esta acción"
}
```

Los datos de los usuarios se devuelven sin incluir las contraseñas.

---

# Propiedad de recursos

Los eventos almacenan una referencia al usuario que los creó mediante el campo:

```text
organizer
```

Cuando un `organizer` crea un evento, su identificador queda asociado al recurso.

Al intentar modificar o eliminar un evento, el servicio verifica:

```text
Admin
→ puede modificar o eliminar cualquier evento.

Organizer
→ solamente puede modificar o eliminar eventos propios.
```

Si un `organizer` intenta modificar un evento perteneciente a otro organizer, la API responde:

```text
403 Forbidden
```

```json
{
  "status": "error",
  "message": "No tenés permisos para modificar este evento"
}
```

---

# Validaciones y seguridad

- Validación de campos obligatorios.
- Validación del formato del email.
- Normalización del email mediante `trim()` y `lowercase()`.
- Prevención de usuarios duplicados.
- Hash de contraseñas mediante bcrypt.
- Comparación segura de contraseñas.
- Generación de JWT firmado mediante `JWT_SECRET`.
- Cookie HTTP Only para almacenar la sesión.
- Middleware reutilizable de autenticación.
- Middleware reutilizable de autorización por roles.
- Diferenciación entre errores `401` y `403`.
- Validación de propiedad de eventos.
- Los usuarios públicos reciben el rol `user` por defecto.
- El registro público no permite asignar roles administrativos.
- Las contraseñas nunca se almacenan ni se devuelven en texto plano.
- Las respuestas administrativas no incluyen contraseñas.

---

# Pruebas de autorización realizadas

Se verificaron los principales escenarios definidos para el sistema de roles:

| Prueba                                     | Resultado esperado | Resultado |
| ------------------------------------------ | -----------------: | --------: |
| `user` intenta crear evento                |                403 |  Aprobado |
| `organizer` crea evento                    |                201 |  Aprobado |
| `organizer` accede a ruta administrativa   |                403 |  Aprobado |
| `admin` accede a ruta administrativa       |                200 |  Aprobado |
| Acceso a ruta privada sin cookie           |                401 |  Aprobado |
| `organizer` intenta modificar evento ajeno |                403 |  Aprobado |
| `admin` modifica evento ajeno              |                200 |  Aprobado |

---

# Logout

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

La cookie `currentUser` es eliminada del navegador.

---

# Roadmap

Las siguientes funcionalidades se incorporarán en futuras versiones:

- Gestión completa de torneos.
- Gestión de categorías.
- Sistema de inscripciones.
- Control de cupos y reglas de negocio.
- Recuperación y restablecimiento de contraseña.
- Documentación de la API con Swagger.
- Logging.
- Notificaciones por correo electrónico.
- Tests automatizados.
