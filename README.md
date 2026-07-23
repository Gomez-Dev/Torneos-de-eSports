# 🎮 Proyecto eSports Tournaments REST API

Base arquitectónica profesional y escalable por capas desarrollada en **Node.js** y **Express** para la gestión de una plataforma de torneos de eSports (*Counter Strike 2 Championship*, *Valorant Cup*, *League of Legends Masters*, *FIFA Tournament*, etc.).

Este proyecto fue diseñado siguiendo las mejores prácticas de la industria para el curso **Backend II**, estableciendo un desacoplamiento estricto entre responsabilidades que permitirá incorporar persistencia con MongoDB, autenticación JWT, Passport, roles, cookies y mailing en futuras entregas sin necesidad de refactorizar la estructura.

---

## 🛠️ Tecnologías

- **Node.js** (v18+)
- **Express.js** (v4.21+)
- **JavaScript (ES Modules)**: Sintaxis limpia `import` / `export` sin transpilation a TypeScript ni sintaxis CommonJS.
- **dotenv**: Gestión centralizada de variables de entorno.

---

## 🏛️ Descripción de la Arquitectura por Capas

El proyecto implementa un flujo de datos en sentido único (*Unidirectional Data Flow*):

```
Request → Route → Controller → Service → Repository → DAO → Database (MongoDB)
```

### Principio de Responsabilidad Única (*Single Responsibility Principle*)

Cada carpeta representa un dominio técnico o funcional bien definido:

| Capa / Carpeta | Propósito y Responsabilidad |
| :--- | :--- |
| `config/` | Centraliza la lectura y validación de las variables de entorno (`dotenv`). Abstrae `process.env` para aislar el resto de la aplicación de dependencias globales. En futuras entregas incluirá conexiones a bases de datos (MongoDB, Redis) y configuraciones de servicios externos (Nodemailer, Passport). |
| `routes/` | Define las rutas HTTP de la API REST (endpoints) y asocia cada path con su controlador y middlewares de validación correspondiente. **No contiene ningún tipo de lógica de negocio o consulta a datos.** |
| `controllers/` | Recibe las peticiones HTTP (`req`), extrae y valida los parámetros de entrada (query, params, body), invoca la lógica de la capa de servicio y construye la respuesta HTTP (`res.status().json()`). **No realiza consultas directas a base de datos ni ejecuta lógica de negocio.** |
| `services/` | Contiene el **núcleo de la lógica de negocio** de la aplicación (reglas de torneos, límites de inscripciones, cálculos de puntuaciones). Es agnóstica al protocolo HTTP (no conoce `req` ni `res`) y desacoplada del motor de base de datos. |
| `repositories/` | Implementa el patrón *Repository*. Funciona como abstracción intermedia entre el Servicio y la capa de acceso a datos (DAO). Permite mapear objetos de dominio y cambiar de motor de base de datos en el futuro sin modificar la lógica del negocio. |
| `dao/` (*Data Access Object*) | Encargada exclusivamente de ejecutar las consultas y operaciones directas contra el motor de persistencia (MongoDB/Mongoose en entregas futuras). Es la única capa que conoce los modelos de datos físicos. |
| `models/` | Define las estructuras, esquemas y entidades del sistema (`User.js`, `Event.js`). En fases posteriores definirá los esquemas Mongoose para MongoDB. |
| `middlewares/` | Interceptores de peticiones HTTP para tareas transversales (*Cross-Cutting Concerns*), tales como autenticación, autorización por roles, manejo global de errores y logging de peticiones. |
| `utils/` | Funciones auxiliares y formateadores reutilizables (respuestas JSON estandarizadas, adaptadores, loggers). |
| `constants/` | Valores constantes inmutables del dominio del sistema (roles de usuario, estados de torneos, categorías de eSports) para evitar la dispersión de cadenas mágicas (*magic strings*). |

---

## 📂 Estructura del Proyecto

```text
proyecto-esports/
├── src/
│   ├── app.js                    # Configuración de Express, middlewares y montaje de rutas
│   ├── server.js                 # Punto de entrada principal que levanta el servidor HTTP
│   │
│   ├── config/                   # Configuración del entorno y variables globales
│   │   └── environment.config.js
│   │
│   ├── routes/                   # Definición de endpoints HTTP
│   │   ├── events.router.js
│   │   ├── sessions.router.js
│   │   └── health.router.js
│   │
│   ├── controllers/              # Controladores HTTP (Req -> Res)
│   │   ├── events.controller.js
│   │   ├── sessions.controller.js
│   │   └── health.controller.js
│   │
│   ├── services/                 # Lógica de negocio del dominio
│   │   ├── events.service.js
│   │   └── sessions.service.js
│   │
│   ├── repositories/             # Abstracción de acceso a datos (Repository Pattern)
│   │   ├── events.repository.js
│   │   └── sessions.repository.js
│   │
│   ├── dao/                      # Objetos de Acceso a Datos (Persistencia directas)
│   │   ├── events.dao.js
│   │   └── sessions.dao.js
│   │
│   ├── models/                   # Estructura y esquemas de entidades
│   │   ├── User.js
│   │   └── Event.js
│   │
│   ├── middlewares/              # Middlewares globales e interceptores
│   │   ├── errorHandler.middleware.js
│   │   └── logger.middleware.js
│   │
│   ├── utils/                    # Utilidades auxiliares (logger, responses)
│   │   ├── logger.utils.js
│   │   └── response.utils.js
│   │
│   └── constants/                # Constantes del dominio (roles, estados de eventos)
│       ├── events.constants.js
│       └── roles.constants.js
│
├── .env.example                  # Plantilla de variables de entorno
├── .gitignore                    # Archivos excluidos de Git
├── package.json                  # Dependencias y scripts
└── README.md                     # Documentación técnica del proyecto
```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/esports
JWT_SECRET=supersecretkey_esports_backend
```

---

## 🚀 Instalación y Ejecución

1. **Clonar e instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Ejecutar en modo producción:**
   ```bash
   npm start
   ```

El servidor iniciará por defecto en `http://localhost:3000`.

---

## 📡 Rutas Iniciales Disponibles

### Health Check
- **`GET /api/health`**
  - **Respuesta (200 OK):**
    ```json
    {
      "status": "ok",
      "message": "Servidor activo"
    }
    ```

### Torneos / Eventos
- **`GET /api/events`**
  - Fluye por: `Route → Controller → Service → Repository → DAO`
  - **Respuesta (200 OK):**
    ```json
    {
      "status": "success",
      "payload": []
    }
    ```

### Sesiones (Estructura base sin autenticación activa)
- **`GET /api/sessions`**
  - **Respuesta (200 OK):**
    ```json
    {
      "status": "success",
      "payload": {
        "active": false,
        "message": "Módulo de sesiones inicializado (sin autenticación activa aún)"
      }
    }
    ```
