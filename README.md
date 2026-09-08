Torneos de eSports API

API REST desarrollada con Node.js, Express y MongoDB Atlas para la administración de una plataforma de eventos y torneos de eSports.

El proyecto implementa una arquitectura por capas, autenticación y autorización mediante Passport, JWT y roles, gestión de usuarios y eventos, validaciones de negocio, filtros, paginación y ordenamiento.

Arquitectura

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

La arquitectura separa responsabilidades entre rutas, controladores, lógica de negocio y acceso a datos.

Estructura del proyecto

Torneos-de-eSports/
│
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ ├── database.config.js
│ │ ├── environment.config.js
│ │ └── passport.config.js
│ ├── constants/
│ │ └── roles.constants.js
│ ├── controllers/
│ ├── dao/
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ └── authorize.middleware.js
│ ├── models/
│ │ ├── Event.js
│ │ └── User.js
│ ├── repositories/
│ ├── routes/
│ ├── services/
│ └── utils/
│ ├── hash.js
│ └── jwt.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md

Tecnologías

Node.js

Express

JavaScript (ES Modules)

MongoDB Atlas

Mongoose

Passport

Passport Local

Passport JWT

JSON Web Token (JWT)

bcrypt

cookie-parser

dotenv

Instalación

Clonar el repositorio:

git clone https://github.com/Gomez-Dev/Torneos-de-eSports.git
cd Torneos-de-eSports

Instalar dependencias:

npm install

Crear un archivo .env tomando como referencia .env.example:

PORT=3000
NODE_ENV=development
MONGO_URL=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/torneos-esports
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h

Iniciar el servidor:

npm run dev

Por defecto:

http://localhost:3000

No subir el archivo .env al repositorio.

Roles y permisos

La API utiliza tres roles:

Rol

Descripción

user

Usuario autenticado con permisos básicos.

organizer

Puede crear y administrar sus propios eventos.

admin

Puede administrar cualquier evento y consultar todos los usuarios.

El rol asignado por defecto al registrarse públicamente es user. El registro público no permite establecer directamente los roles organizer o admin.

Matriz de permisos

Acción

user

organizer

admin

Consultar eventos

Sí

Sí

Sí

Crear eventos

No

Sí

Sí

Modificar eventos propios

No

Sí

Sí

Modificar cualquier evento

No

No

Sí

Ver todos los usuarios

No

No

Sí

Consultar usuario autenticado

Sí

Sí

Sí

Autenticación y autorización

La autenticación utiliza Passport y JWT.

passport-local: registro y login.

passport-jwt: consulta de la sesión actual.

bcrypt: hash y validación de contraseñas.

JWT: almacenado en una cookie HTTP Only llamada currentUser.

auth.middleware.js: valida el JWT y establece req.user.

authorize.middleware.js: verifica los roles permitidos.

401 Unauthorized

Se devuelve cuando no existe una sesión válida:

{
"status": "error",
"message": "No autenticado"
}

403 Forbidden

Se devuelve cuando el usuario está autenticado pero no tiene permisos:

{
"status": "error",
"message": "No tenés permisos para realizar esta acción"
}

Endpoints

Health

Método

Endpoint

Descripción

GET

/api/health

Verifica el estado del servidor.

Sessions

Método

Endpoint

Descripción

Auth

GET

/api/sessions

Información del recurso.

No

POST

/api/sessions/register

Registra un usuario.

No

POST

/api/sessions/login

Inicia sesión.

No

GET

/api/sessions/current

Obtiene el usuario autenticado.

Sí

POST

/api/sessions/logout

Cierra la sesión.

No

Events

Método

Endpoint

Descripción

Auth

GET

/api/events

Lista eventos.

No

GET

/api/events/:id

Obtiene un evento.

No

POST

/api/events

Crea un evento.

organizer/admin

PUT

/api/events/:id

Modifica un evento.

organizer/admin

PATCH

/api/events/:id/status

Modifica el estado.

organizer/admin

Users

Método

Endpoint

Descripción

Auth

GET

/api/users

Obtiene todos los usuarios.

admin

Eventos

Los eventos contienen:

title
description
category
date
location
capacity
price
status
organizer

organizer es una referencia ObjectId al usuario creador.

Estados disponibles:

draft
published
cancelled
finished

Crear evento

POST /api/events

Requiere autenticación y rol organizer o admin.

Ejemplo:

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

El campo organizer no se recibe desde el body. Se asigna automáticamente a partir del usuario autenticado.

Validaciones

Campos obligatorios.

Fecha válida y no pasada.

Capacidad mayor a 0.

Precio mayor o igual a 0.

Estados válidos.

No se puede publicar un evento cancelled o finished.

Un organizer no puede modificar eventos de otro organizer.

Los eventos cancelados requieren una justificación para volver a modificarse.

Cancelar un evento cambia su estado a cancelled; no se realiza una eliminación física.

Listado de eventos

GET /api/events

Filtros disponibles:

status
category
location
dateFrom
dateTo

Paginación:

page
limit

Ordenamiento:

sort

Ejemplos:

GET /api/events?status=published&category=workshop&page=1&limit=5

GET /api/events?sort=-price

Campos de ordenamiento:

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

Registro de usuario

POST /api/sessions/register

{
"first_name": "José",
"last_name": "Gómez",
"email": "jose@gmail.com",
"password": "12345678"
}

El registro público asigna automáticamente el rol user.

Login

POST /api/sessions/login

{
"email": "jose@gmail.com",
"password": "12345678"
}

Respuesta:

{
"status": "success",
"message": "Login correcto"
}

El JWT se almacena en la cookie currentUser.

Sesión actual

GET /api/sessions/current

Requiere una sesión válida.

Respuesta:

{
"status": "success",
"payload": {
"id": "...",
"email": "jose@gmail.com",
"role": "user"
}
}

Logout

POST /api/sessions/logout

Respuesta:

{
"status": "success",
"message": "Sesión cerrada"
}

La cookie currentUser es eliminada.

Administración de usuarios

GET /api/users

Requiere autenticación y rol admin.

Los usuarios con rol user u organizer reciben 403 Forbidden.

Las contraseñas no se incluyen en la respuesta.

Seguridad

Contraseñas protegidas mediante bcrypt.

JWT firmado mediante JWT_SECRET.

JWT almacenado en cookie HTTP Only.

Variables sensibles mediante .env.

.env incluido en .gitignore.

Middleware reutilizable de autenticación.

Middleware reutilizable de autorización.

Validación de ownership de eventos.

Registro público con rol user.

No se permite asignar roles administrativos desde el registro.

Las contraseñas no se devuelven en las respuestas.

Pruebas realizadas

Caso

Resultado

Registro de usuario

Aprobado

Login

Aprobado

Consulta de sesión

Aprobado

Logout

Aprobado

user intenta crear evento

403

organizer crea evento

201

Fecha pasada

400

Capacidad 0

400

Organizer modifica evento propio

200

Organizer modifica evento ajeno

403

Admin modifica evento ajeno

200

Acceso privado sin sesión

401

Publicar evento cancelado

400

Modificar cancelado sin justificación

400

Filtros y paginación

Aprobado

Ordenamiento

Aprobado

Evento inexistente

404

Acceso a usuarios como admin

200

Acceso a usuarios como organizer/user

403

Estado del proyecto

Proyecto desarrollado como parte de Backend II, implementando autenticación, autorización, gestión de usuarios y eventos con persistencia en MongoDB Atlas.
