# 🎮 Proyecto eSports Tournaments REST API

Desarrollada en **Node.js** y **Express** para la gestión de una plataforma de torneos de eSports (_Counter Strike 2 Championship_, _Valorant Cup_, _League of Legends Masters_, _FIFA Tournament_, etc.).

---

## 🛠️ Tecnologías

- **Node.js** (v18+)
- **Express.js** (v4.21+)
- **JavaScript (ES Modules)**

---

## 🏛️ Descripción de la Arquitectura por Capas

El proyecto implementa un flujo de datos en sentido único (_Unidirectional Data Flow_):

```
Request → Route → Controller → Service → Repository → DAO → Database (MongoDB)
```

---

## 📂 Estructura del Proyecto

```text
proyecto-esports/
├── src/
│   ├── app.js                    # Configuración de Express, middlewares y montaje de rutas
│   ├── server.js                 # Punto de entrada principal que levanta el servidor HTTP
│   │
│   ├── config/
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
