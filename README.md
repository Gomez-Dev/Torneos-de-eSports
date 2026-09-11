# Torneos de eSports API

API REST para la gestión de eventos y torneos de eSports, desarrollada como proyecto de Backend II.

La aplicación permite registrar usuarios, gestionar sesiones mediante JWT, administrar eventos, gestionar inscripciones mediante tickets y controlar el acceso a los recursos mediante roles y ownership.

## Características

- Registro y autenticación de usuarios.
- Login y logout mediante JWT.
- Cookie HTTP Only para la sesión.
- Autenticación con Passport Local y Passport JWT.
- Autorización basada en roles.
- Gestión de eventos.
- Gestión de tickets e inscripciones.
- Validaciones de negocio.
- Control de ownership de eventos y tickets.
- Control de cupos disponibles.
- Cancelación lógica de tickets.
- Envío de email de confirmación de inscripción.
- Filtros, paginación y ordenamiento de eventos.
- Persistencia en MongoDB Atlas.
- Arquitectura por capas.
- DAO y Repository por entidad.
- DTOs para controlar la información expuesta por la API.
- Manejo centralizado de errores.

## Stack tecnológico

| Tecnología     | Uso                  |
| -------------- | -------------------- |
| Node.js        | Runtime              |
| Express        | Framework HTTP       |
| MongoDB Atlas  | Base de datos        |
| Mongoose       | ODM                  |
| Passport       | Autenticación        |
| Passport Local | Registro y login     |
| Passport JWT   | Validación de sesión |
| JSON Web Token | Autenticación        |
| bcrypt         | Hash de contraseñas  |
| cookie-parser  | Gestión de cookies   |
| dotenv         | Variables de entorno |
| Nodemailer     | Envío de emails      |

## Arquitectura

El proyecto utiliza una arquitectura por capas para separar responsabilidades y evitar que los Controllers accedan directamente a la base de datos.

Flujo general:

    Routes
       ↓
    Middlewares
       ↓
    Controllers
       ↓
    Services
       ↓
    Repositories
       ↓
    DAO
       ↓
    Models
       ↓
    MongoDB

### Responsabilidades

**Routes**

Definen los endpoints HTTP y conectan las solicitudes con los Controllers y Middlewares correspondientes.

**Middlewares**

Gestionan autenticación, autorización y procesamiento de errores.

**Controllers**

Se encargan de recibir la solicitud HTTP, invocar al Service correspondiente y construir la respuesta.

**Services**

Contienen las reglas y lógica de negocio de la aplicación.

**Repositories**

Abstraen el acceso a los DAO y proporcionan métodos orientados al dominio.

**DAO**

Son la única capa que accede directamente a los modelos de Mongoose y realizan las operaciones de persistencia.

**DTOs**

Controlan qué información se devuelve al cliente y evitan exponer datos sensibles, especialmente contraseñas.

## Estructura principal

    Torneos-de-eSports/
    ├── src/
    │   ├── app.js
    │   ├── server.js
    │   ├── config/
    │   │   ├── database.config.js
    │   │   ├── environment.config.js
    │   │   └── passport.config.js
    │   ├── constants/
    │   │   └── roles.constants.js
    │   ├── controllers/
    │   │   ├── events.controller.js
    │   │   ├── health.controller.js
    │   │   ├── sessions.controller.js
    │   │   ├── tickets.controller.js
    │   │   └── users.controller.js
    │   ├── dao/
    │   │   ├── events.dao.js
    │   │   ├── tickets.dao.js
    │   │   └── users.dao.js
    │   ├── dto/
    │   │   ├── event.dto.js
    │   │   ├── ticket.dto.js
    │   │   └── user.dto.js
    │   ├── middlewares/
    │   │   ├── auth.middleware.js
    │   │   ├── authorize.middleware.js
    │   │   └── error.middleware.js
    │   ├── models/
    │   │   ├── Event.js
    │   │   ├── Ticket.js
    │   │   └── User.js
    │   ├── repositories/
    │   │   ├── events.repository.js
    │   │   ├── tickets.repository.js
    │   │   └── users.repository.js
    │   ├── routes/
    │   │   ├── events.router.js
    │   │   ├── health.router.js
    │   │   ├── sessions.router.js
    │   │   ├── tickets.router.js
    │   │   └── users.router.js
    │   ├── services/
    │   │   ├── events.service.js
    │   │   ├── tickets.service.js
    │   │   └── users.service.js
    │   └── utils/
    │       ├── hash.js
    │       ├── jwt.js
    │       └── mailer.js
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── README.md

## Requisitos

- Node.js
- Una base de datos MongoDB Atlas
- Variables de entorno configuradas

## Instalación

Clonar el repositorio:

    git clone https://github.com/Gomez-Dev/Torneos-de-eSports.git
    cd Torneos-de-eSports

Instalar dependencias:

    npm install

Crear un archivo `.env` a partir de `.env.example`.

Ejemplo:

    PORT=3000
    NODE_ENV=development

    MONGO_URL=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/torneos-esports

    JWT_SECRET=your_secret_key
    JWT_EXPIRES_IN=1h

    MAIL_HOST=
    MAIL_PORT=
    MAIL_USER=
    MAIL_PASS=
    MAIL_FROM=

Iniciar el servidor:

    npm run dev

La API estará disponible por defecto en:

    http://localhost:3000

El archivo `.env` contiene información sensible y no debe subirse al repositorio.

## Autenticación

La autenticación se implementa mediante Passport y JWT.

### Flujo

    Registro / Login
           ↓
    Passport Local
           ↓
    UsersService
           ↓
    UsersRepository
           ↓
    UsersDAO
           ↓
    Usuario
           ↓
    JWT
           ↓
    Cookie HTTP Only
           ↓
    Middleware de autenticación
           ↓
    req.user

Las contraseñas se almacenan utilizando bcrypt.

La cookie utilizada para la sesión se denomina:

    currentUser

## Roles y autorización

El sistema utiliza tres roles:

| Rol       | Descripción                                                        |
| --------- | ------------------------------------------------------------------ |
| user      | Usuario autenticado con permisos básicos.                          |
| organizer | Puede crear y administrar sus propios eventos.                     |
| admin     | Puede administrar cualquier evento y consultar todos los usuarios. |

El registro público asigna automáticamente el rol `user`.

Los roles `organizer` y `admin` no pueden establecerse desde el body del registro.

### Permisos

| Acción                                | user | organizer | admin |
| ------------------------------------- | :--: | :-------: | :---: |
| Consultar eventos                     |  ✓   |     ✓     |   ✓   |
| Crear eventos                         |  —   |     ✓     |   ✓   |
| Modificar eventos propios             |  —   |     ✓     |   ✓   |
| Modificar eventos ajenos              |  —   |     —     |   ✓   |
| Consultar tickets de un evento propio |  —   |     ✓     |   ✓   |
| Consultar tickets de cualquier evento |  —   |     —     |   ✓   |
| Cancelar ticket propio                |  ✓   |     ✓     |   ✓   |
| Cancelar ticket ajeno                 |  —   |     —     |   ✓   |
| Consultar todos los usuarios          |  —   |     —     |   ✓   |
| Consultar sesión actual               |  ✓   |     ✓     |   ✓   |

La autorización se implementa mediante el middleware reutilizable `authorize`.

## Eventos

Cada evento contiene:

    title
    description
    category
    date
    location
    capacity
    price
    status
    organizer

El campo `organizer` almacena una referencia `ObjectId` al usuario responsable del evento.

### Estados disponibles

    draft
    published
    cancelled
    finished

### Reglas de negocio

- Los campos obligatorios deben estar presentes.
- La fecha debe ser válida y no puede ser pasada.
- La capacidad debe ser mayor a 0.
- El precio debe ser mayor o igual a 0.
- El estado debe ser válido.
- No se puede publicar un evento cancelado o finalizado.
- Un organizer solamente puede modificar sus propios eventos.
- Un admin puede modificar eventos de cualquier organizer.
- Un evento cancelado requiere una justificación para volver a modificarse.
- Cancelar un evento cambia su estado a `cancelled`; no se elimina físicamente.

## Tickets e inscripciones

Los tickets representan las inscripciones de usuarios a eventos.

Cada ticket contiene:

    user
    event
    status
    quantity
    reservationCode
    createdAt
    cancelledAt

Los campos `user` y `event` son referencias `ObjectId`.

### Estados disponibles

    confirmed
    pending
    cancelled

### Reglas de inscripción

- El evento debe existir.
- El evento debe estar publicado.
- El evento no puede estar cancelado ni finalizado.
- La fecha del evento no puede haber pasado.
- La cantidad debe ser un número entero mayor a 0.
- Los tickets `confirmed` y `pending` ocupan cupos.
- Los tickets `cancelled` no ocupan cupos.
- Un usuario no puede tener más de una inscripción activa para el mismo evento.
- La cantidad solicitada no puede superar los cupos disponibles.
- Cada ticket recibe un código de reserva único.

### Cancelación

La cancelación de un ticket es lógica.

El ticket no se elimina físicamente de la base de datos.

Al cancelar:

    status → cancelled
    cancelledAt → fecha de cancelación

Los tickets cancelados dejan de ocupar cupos del evento.

La cancelación solamente puede realizarla:

- El usuario propietario del ticket.
- Un administrador.

Intentar cancelar un ticket ya cancelado devuelve `400 Bad Request`.

Intentar cancelar un ticket de otro usuario sin permisos devuelve `403 Forbidden`.

## Email de confirmación

Al completar correctamente una inscripción se envía un email de confirmación mediante Nodemailer.

El email contiene:

- Nombre del evento.
- Fecha.
- Ubicación.
- Cantidad de lugares.
- Código de reserva.

Las variables utilizadas son:

    MAIL_HOST=
    MAIL_PORT=
    MAIL_USER=
    MAIL_PASS=
    MAIL_FROM=

## DTOs

Los DTOs controlan la información expuesta por la API.

### User DTO

El usuario nunca devuelve su contraseña.

Información expuesta:

    id
    first_name
    last_name
    email
    role

### Event DTO

Expone los datos principales del evento y, cuando corresponde, información segura del organizer.

### Ticket DTO

Expone los datos principales del ticket y, cuando corresponde, información segura del evento y usuario relacionado.

Las contraseñas nunca se incluyen en los DTOs.

# API

## Health

| Método | Endpoint      | Acceso  |
| ------ | ------------- | ------- |
| GET    | `/api/health` | Público |

Verifica que el servidor se encuentre activo.

# Sessions

| Método | Endpoint                 | Acceso      |
| ------ | ------------------------ | ----------- |
| GET    | `/api/sessions`          | Público     |
| POST   | `/api/sessions/register` | Público     |
| POST   | `/api/sessions/login`    | Público     |
| GET    | `/api/sessions/current`  | Autenticado |
| POST   | `/api/sessions/logout`   | Público     |

## Registro

    POST /api/sessions/register

Body:

    {
      "first_name": "José",
      "last_name": "Gómez",
      "email": "jose@gmail.com",
      "password": "12345678"
    }

El usuario registrado recibe automáticamente el rol `user`.

Respuesta:

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

La contraseña no se devuelve.

## Login

    POST /api/sessions/login

Body:

    {
      "email": "jose@gmail.com",
      "password": "12345678"
    }

Respuesta:

    {
      "status": "success",
      "message": "Login correcto"
    }

El JWT se almacena en la cookie `currentUser`.

## Sesión actual

    GET /api/sessions/current

Respuesta:

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

La contraseña nunca se incluye en la respuesta.

## Logout

    POST /api/sessions/logout

Cierra la sesión eliminando la cookie `currentUser`.

# Events

| Método | Endpoint                   | Acceso                        |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/api/events`              | Público                       |
| GET    | `/api/events/:id`          | Público                       |
| POST   | `/api/events`              | organizer / admin             |
| PUT    | `/api/events/:id`          | organizer / admin             |
| PATCH  | `/api/events/:id/status`   | organizer / admin             |
| POST   | `/api/events/:eid/tickets` | Autenticado                   |
| GET    | `/api/events/:eid/tickets` | organizer propietario / admin |

## Crear evento

    POST /api/events

Body:

    {
      "title": "Torneo de eSports",
      "description": "Torneo competitivo de prueba",
      "category": "eSports",
      "date": "2026-09-15",
      "location": "Buenos Aires",
      "capacity": 100,
      "price": 1000,
      "status": "published"
    }

El organizer se asigna automáticamente a partir del usuario autenticado.

## Obtener un evento

    GET /api/events/:id

Obtiene la información de un evento específico.

## Listar eventos

    GET /api/events

Filtros disponibles:

    status
    category
    location
    dateFrom
    dateTo

También admite paginación:

    page
    limit

Y ordenamiento mediante:

    sort

Ejemplos:

    GET /api/events?status=published&category=workshop&page=1&limit=5

    GET /api/events?sort=-price

Campos disponibles para ordenar:

    date
    title
    capacity
    price
    createdAt

Respuesta:

    {
      "status": "success",
      "data": [],
      "page": 1,
      "limit": 5,
      "total": 0,
      "totalPages": 0
    }

## Modificar evento

    PUT /api/events/:id

Un organizer solamente puede modificar sus propios eventos.

Un admin puede modificar eventos de cualquier organizer.

## Modificar estado

    PATCH /api/events/:id/status

Permite modificar el estado del evento respetando las reglas de negocio y ownership.

# Tickets

## Crear inscripción

    POST /api/events/:eid/tickets

Requiere autenticación.

Body:

    {
      "quantity": 1
    }

Respuesta:

    {
      "status": "success",
      "payload": {
        "id": "...",
        "status": "confirmed",
        "quantity": 1,
        "reservationCode": "...",
        "createdAt": "...",
        "cancelledAt": null,
        "event": "...",
        "user": "..."
      }
    }

Al realizar correctamente la inscripción se envía un email de confirmación.

## Mis tickets

    GET /api/tickets/my-tickets

Requiere autenticación.

Los tickets incluyen información del evento:

    id
    title
    date
    location

No se exponen contraseñas ni información sensible.

## Tickets de un evento

    GET /api/events/:eid/tickets

Requiere:

- Organizer propietario del evento.
- Admin.

Un organizer no puede consultar los tickets de eventos pertenecientes a otro organizer.

## Cancelar ticket

    PATCH /api/tickets/:tid/cancel

Requiere autenticación.

El usuario solamente puede cancelar sus propios tickets.

Un admin puede cancelar cualquier ticket.

La operación no elimina el ticket de la base de datos.

# Users

| Método | Endpoint     | Acceso |
| ------ | ------------ | ------ |
| GET    | `/api/users` | admin  |

Obtiene todos los usuarios.

Las contraseñas no se incluyen en la respuesta.

# Manejo de errores

La API utiliza un middleware centralizado para manejar errores.

## 400 Bad Request

Se devuelve para errores de validación o reglas de negocio.

Ejemplo:

    {
      "status": "error",
      "message": "La capacidad debe ser mayor a 0"
    }

## 401 Unauthorized

Se devuelve cuando no existe una sesión válida.

    {
      "status": "error",
      "message": "No autenticado"
    }

## 403 Forbidden

Se devuelve cuando el usuario está autenticado pero no tiene permisos suficientes.

    {
      "status": "error",
      "message": "No tenés permisos para realizar esta acción"
    }

## 404 Not Found

Se utiliza cuando el recurso solicitado no existe.

    {
      "status": "error",
      "message": "Evento no encontrado"
    }

## 409 Conflict

Se utiliza cuando existe un conflicto con el estado actual del recurso.

Ejemplo:

    {
      "status": "error",
      "message": "El usuario ya tiene una inscripción activa para este evento"
    }

## 500 Internal Server Error

Se utiliza para errores internos no contemplados por las reglas de negocio.

# Seguridad

- Contraseñas protegidas mediante bcrypt.
- JWT firmado mediante `JWT_SECRET`.
- JWT almacenado en cookie HTTP Only.
- Variables sensibles gestionadas mediante `.env`.
- `.env` incluido en `.gitignore`.
- Autenticación mediante middleware reutilizable.
- Autorización mediante middleware reutilizable.
- Validación de ownership de eventos.
- Validación de ownership de tickets.
- El registro público asigna el rol `user`.
- No se exponen contraseñas en las respuestas.
- Los DTOs controlan la información expuesta por la API.

# Pruebas realizadas

Se verificaron los principales escenarios de autenticación, autorización, gestión de eventos, tickets y arquitectura.

| Caso                                           | Resultado |
| ---------------------------------------------- | --------: |
| Registro de usuario                            |       201 |
| Login                                          |       200 |
| Consulta de sesión actual                      |       200 |
| Sesión actual sin password                     |         ✓ |
| Logout                                         |         ✓ |
| user intenta crear evento                      |       403 |
| organizer crea evento                          |       201 |
| Fecha pasada                                   |       400 |
| Capacidad 0                                    |       400 |
| Organizer modifica evento propio               |       200 |
| Organizer modifica evento ajeno                |       403 |
| Admin modifica evento ajeno                    |       200 |
| Acceso privado sin sesión                      |       401 |
| Publicar evento cancelado                      |       400 |
| Modificar cancelado sin justificación          |       400 |
| Filtros y paginación                           |         ✓ |
| Ordenamiento                                   |         ✓ |
| Evento inexistente                             |       404 |
| Usuarios como admin                            |       200 |
| Usuarios como organizer/user                   |       403 |
| Inscripción válida a evento publicado          |       201 |
| Inscripción a evento draft                     |       400 |
| Cantidad inválida                              |       400 |
| Inscripción duplicada activa                   |       409 |
| Evento inexistente al inscribirse              |       404 |
| Confirmación por email                         |         ✓ |
| Consulta de mis tickets                        |       200 |
| Ticket con evento populado                     |         ✓ |
| Ticket sin password de usuario                 |         ✓ |
| Consulta de tickets como organizer propietario |       200 |
| Consulta de tickets como usuario sin permisos  |       403 |
| Cancelación de ticket propio                   |       200 |
| Cancelación de ticket ajeno                    |       403 |
| Cancelar ticket ya cancelado                   |       400 |
| Ticket cancelado permanece en BD               |         ✓ |
| Ticket cancelado deja de ocupar cupo           |         ✓ |
| Registro después del refactor                  |       201 |
| Login después del refactor                     |       200 |
| Manejo de errores de EventsService             |         ✓ |

# Estado del proyecto

Proyecto desarrollado como parte de Backend II, con:

- Autenticación mediante Passport y JWT.
- Autorización mediante roles y ownership.
- Gestión de usuarios.
- Gestión de eventos.
- Gestión de tickets e inscripciones.
- Control de cupos.
- Cancelación lógica.
- Envío de emails de confirmación.
- Validaciones de negocio.
- Persistencia en MongoDB Atlas.
- Arquitectura por capas.
- DAO y Repository por entidad.
- Services para lógica de negocio.
- DTOs para controlar la información expuesta.
- Manejo centralizado de errores.
