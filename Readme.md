# 🌪️ Vortex - Sistema de Gestión de Piscinas

**Vortex** es una aplicación web FullStack diseñada para la administración eficiente de piscinas y usuarios. Permite gestionar inventarios detallados de piscinas (incluyendo bombas, documentos técnicos e imágenes) y controlar el acceso de usuarios mediante roles y autenticación segura.

Este proyecto fue desarrollado como parte de una prueba técnica para el rol de **Desarrollador FullStack**, utilizando **MERN Stack** (MongoDB, Express, React, Node.js) con TypeScript en el servidor.

---

## 🚀 Tecnologías Utilizadas

### Backend (API RESTful)
* **Runtime:** Node.js
* **Lenguaje:** TypeScript
* **Framework:** Express.js
* **Base de Datos:** MongoDB & Mongoose ODM
* **Seguridad:** JWT (JSON Web Tokens) & bcryptjs
* **Archivos:** Cloudinary (Gestión de imágenes y PDFs)
* **Documentación:** Swagger UI

### Frontend (Cliente Web)
* **Librería:** React.js (Vite/CRA)
* **Estado Global:** Zustand
* **UI Framework:** Material UI (MUI)
* **Routing:** React Router Dom
* **HTTP Client:** Axios

---

## 📂 Estructura del Proyecto

El repositorio está organizado en dos carpetas principales:

* `/backend`: Contiene toda la lógica del servidor, modelos de base de datos, controladores y rutas de la API.
* `/frontend`: Contiene la interfaz de usuario construida con React.

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalado en tu máquina:
1.  **Node.js** (v16 o superior)
2.  **MongoDB** (Tener una instancia local corriendo o una URI de MongoDB Atlas)
3.  **Git**

---

## ⚙️ Instalación y Ejecución

Sigue estos pasos para levantar el proyecto completo en tu entorno local.

### 1. Configuración del Backend

Navega a la carpeta del servidor e instala las dependencias:

```bash
cd backend
npm install



Variables de entorno Entorno (.env): Crea un archivo .env en la carpeta /backend con las siguientes variables (ajusta según tus credenciales):

Fragmento de código

PORT=5000
MONGO_URI=mongodb://localhost:27017/vortex_db
JWT_SECRET=palabra_secreta_segura
NODE_ENV=development

# Credenciales de Cloudinary (Requerido para subir fotos/PDFs)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret


Inicia el servidor en modo desarrollo:

Bash

npm run dev
El backend correrá en http://localhost:5000 Documentación Swagger disponible en: http://localhost:5000/api-docs

2. Configuración del Frontend
Abre una nueva terminal, navega a la carpeta del cliente e instala las dependencias:

Bash

cd frontend
npm install
Inicia la aplicación de React:

Bash

npm start
El frontend se abrirá automáticamente en http://localhost:3000



🌟 Funcionalidades Principales
Gestión de Usuarios (Admin)
Login Seguro: Autenticación mediante JWT.

Roles: Sistema de roles ADMIN y USER.

CRUD Usuarios: Crear, editar y listar usuarios.

Inactivación: Funcionalidad lógica para bloquear el acceso a usuarios sin eliminarlos.

Gestión de Piscinas
Inventario Detallado: Registro de características físicas (ancho, largo, profundidad, forma).

Validaciones Avanzadas: Control estricto de datos (ej. orden ascendente en profundidades).

Manejo de Archivos: Carga de foto principal, hoja de seguridad (PDF) y ficha técnica (PDF).

Bombas Dinámicas:

Agregar múltiples bombas por piscina.

Opción de "Se repite" para duplicar registros automáticamente.

Gestión de fotos individuales por bomba.

🧪 Pruebas y Documentación
API Docs: Puedes probar todos los endpoints del backend directamente desde Swagger UI navegando a /api-docs cuando el servidor esté activo.

Desarrollado por Jorge AZH para la prueba de Desarrollador FullStack.