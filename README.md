# 🎮 Torneos de eSports API

API REST desarrollada con **Node.js** y **Express** para la administración de torneos de eSports.

La aplicación permite gestionar torneos, categorías, usuarios e inscripciones mediante una arquitectura por capas, diseñada para ofrecer un código organizado, mantenible y escalable. La separación de responsabilidades facilita la incorporación de nuevas funcionalidades, mejora la reutilización de componentes y permite que la aplicación evolucione de forma ordenada.

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

Esta estructura desacopla las diferentes responsabilidades de la aplicación, facilitando el mantenimiento, la escalabilidad y la incorporación de nuevas funcionalidades sin afectar el resto del sistema.

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
│   ├── middlewares/
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
│       └── hash.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# 📚 Responsabilidad de cada carpeta

| Carpeta           | Responsabilidad                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| **config/**       | Centraliza la configuración general de la aplicación, incluyendo variables de entorno y conexión a la base de datos. |
| **constants/**    | Contiene constantes reutilizables compartidas por toda la aplicación.                                                |
| **controllers/**  | Reciben las solicitudes HTTP y delegan la lógica de negocio a los servicios.                                         |
| **dao/**          | Gestiona el acceso directo a la base de datos mediante Mongoose.                                                     |
| **docs/**         | Espacio destinado a documentación técnica y futuras especificaciones de la API.                                      |
| **middlewares/**  | Contiene middlewares reutilizables para futuras funcionalidades.                                                     |
| **models/**       | Define los modelos de datos mediante Mongoose.                                                                       |
| **public/**       | Recursos públicos utilizados por la aplicación cuando sean necesarios.                                               |
| **repositories/** | Intermediario entre los servicios y la capa de acceso a datos.                                                       |
| **routes/**       | Define los endpoints de la API.                                                                                      |
| **services/**     | Implementa la lógica de negocio de la aplicación.                                                                    |
| **utils/**        | Funciones auxiliares reutilizables, como el helper de bcrypt.                                                        |

---

# 🚀 Tecnologías

- Node.js
- Express
- JavaScript (ES Modules)
- MongoDB
- Mongoose
- bcrypt
- dotenv

---

# ⚙ Variables de entorno

Crear un archivo **.env** tomando como referencia el archivo **.env.example**.

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb://127.0.0.1:27017/torneos-esports
JWT_SECRET=your_secret_key
```

---

# ▶ Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
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

## Health Check

```http
GET /api/health
```

**Respuesta**

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

---

## Events

```http
GET /api/events
```

**Respuesta**

```json
{
  "status": "success",
  "payload": []
}
```

---

## Sessions

### Registro de usuarios

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

### Respuesta exitosa

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

### Validaciones

- Todos los campos son obligatorios.
- El email debe tener un formato válido.
- La contraseña debe tener al menos 8 caracteres.
- El email se normaliza automáticamente (`trim` + `lowercase`).
- No se permiten usuarios con emails duplicados.
- La contraseña se almacena hasheada utilizando **bcrypt**.
- La respuesta del endpoint nunca devuelve la contraseña.

---

# 🔮 Roadmap

Las siguientes funcionalidades se incorporarán progresivamente durante la evolución del proyecto:

- Inicio de sesión.
- Autenticación mediante JWT.
- Autorización basada en roles.
- Recuperación y restablecimiento de contraseña.
- Gestión completa de torneos.
- Gestión de categorías.
- Sistema de inscripciones a torneos.
- Control de cupos y validaciones de negocio.
- Protección de rutas mediante middlewares.
- Persistencia de datos con MongoDB y Mongoose.
- Documentación de la API.
- Manejo centralizado de errores.
- Registro de eventos (Logging).
- Envío de notificaciones por correo electrónico.
