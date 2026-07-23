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
│   ├── constants/
│   ├── controllers/
│   ├── dao/
│   ├── docs/
│   ├── middlewares/
│   ├── models/
│   ├── public/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# 📚 Responsabilidad de cada carpeta

| Carpeta           | Responsabilidad                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **config/**       | Centraliza la configuración general de la aplicación, incluyendo variables de entorno, conexión a la base de datos y configuración de librerías. |
| **constants/**    | Contiene constantes reutilizables como roles, estados, mensajes y otros valores compartidos por toda la aplicación.                              |
| **controllers/**  | Reciben las solicitudes HTTP, procesan la información necesaria y delegan la lógica de negocio a los servicios correspondientes.                 |
| **dao/**          | Gestiona el acceso directo a la base de datos, encapsulando las operaciones de persistencia.                                                     |
| **docs/**         | Espacio destinado a la documentación técnica del proyecto, diagramas, colecciones de Postman y futuras especificaciones de la API.               |
| **middlewares/**  | Agrupa los middlewares reutilizables para autenticación, autorización, validaciones y manejo centralizado de errores.                            |
| **models/**       | Define los modelos de datos de la aplicación mediante Mongoose.                                                                                  |
| **public/**       | Contiene recursos públicos utilizados por la aplicación cuando sean necesarios.                                                                  |
| **repositories/** | Actúa como intermediario entre los servicios y la capa de acceso a datos, desacoplando la lógica de negocio de la persistencia.                  |
| **routes/**       | Define los endpoints de la API y los asocia con sus respectivos controladores.                                                                   |
| **services/**     | Implementa la lógica de negocio de la aplicación y coordina la comunicación entre controladores y repositorios.                                  |
| **utils/**        | Reúne funciones auxiliares reutilizables por las distintas capas del proyecto.                                                                   |

---

# 🚀 Tecnologías

- Node.js
- Express
- JavaScript (ES Modules)
- dotenv
- MongoDB Atlas
- Mongoose
- JWT
- Passport
- bcrypt

---

# ⚙ Variables de entorno

Crear un archivo **.env** tomando como referencia el archivo **.env.example**.

```env
PORT=
NODE_ENV=
MONGO_URL=
JWT_SECRET=
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

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

---

# 🌐 Endpoints disponibles

## Health Check

```http
GET /api/health
```

**Respuesta:**

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

**Respuesta inicial:**

```json
{
  "status": "success",
  "payload": []
}
```

---

## Sessions

La estructura del recurso **Sessions** se encuentra preparada para incorporar las funcionalidades relacionadas con autenticación y gestión de sesiones.

---

# 🔮 Roadmap

Las siguientes funcionalidades se incorporarán progresivamente durante la evolución del proyecto:

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Autorización basada en roles.
- Recuperación y restablecimiento de contraseña.
- Gestión completa de torneos.
- Gestión de categorías.
- Sistema de inscripciones a torneos.
- Control de cupos y validaciones de negocio.
- Protección de rutas mediante middlewares.
- Persistencia de datos con MongoDB Atlas y Mongoose.
- Documentación de la API.
- Manejo centralizado de errores.
- Registro de eventos (Logging).
- Envío de notificaciones por correo electrónico.
