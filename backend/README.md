# 🌪️ Vortex Backend

Este repositorio contiene la API RESTful del sistema **Vortex**, encargada de gestionar la lógica de negocio, autenticación y conexión a datos para la administración de piscinas y usuarios.

Construido con **Node.js**, **Express** y **TypeScript** para garantizar escalabilidad y tipado estático robusto.

## 🛠️ Tecnologías Clave

* **Runtime:** Node.js
* **Framework:** Express.js
* **Lenguaje:** TypeScript
* **Base de Datos:** MongoDB (con Mongoose)
* **Autenticación:** JWT (JSON Web Tokens)
* **Almacenamiento:** Cloudinary (Gestión de imágenes)
* **Documentación:** Swagger UI

## 🚀 Instalación y Configuración

### 1. Prerrequisitos
Asegúrate de tener instalado:
* Node.js (v16 o superior)
* MongoDB (Instancia local o Atlas URI)

### 2. Instalación de dependencias
```bash
npm install

PORT=5000
MONGO_URI=mongodb://localhost:27017/vortex_db
JWT_SECRET=tu_secreto_super_seguro
NODE_ENV=development

# Configuración de Cloudinary (Para subida de imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret