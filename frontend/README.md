# 🌪️ Vortex Frontend

Panel administrativo y cliente web para el sistema **Vortex**. Permite la gestión intuitiva de usuarios y piscinas, ofreciendo una interfaz moderna y reactiva.

Desarrollado con **React** y **Material UI**, utilizando **Zustand** para una gestión de estado global ligera y eficiente.

## 🎨 Tecnologías Clave

* **Framework:** React.js
* **UI Library:** Material UI (@mui/material)
* **Estado Global:** Zustand 🐻
* **Enrutamiento:** React Router DOM
* **Cliente HTTP:** Axios (con interceptores para JWT)

## ⚡ Características

* 🔐 **Autenticación Segura:** Login persistente con manejo automático de tokens.
* 👥 **Gestión de Usuarios:** Creación, edición e inactivación (Soft Delete) de usuarios.
* 🏊 **Gestión de Piscinas:** CRUD completo con soporte para subida de imágenes.
* 📱 **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla gracias a MUI.
* 🛡️ **Rutas Protegidas:** Sistema de seguridad que restringe el acceso según el estado de autenticación.

## 🚀 Puesta en Marcha

### 1. Instalación
Navega a la carpeta del frontend e instala las dependencias:

```bash
cd frontend
npm install
npm start


### estructura del proyecto

src/
├── api/            # Configuración de Axios e interceptores
├── components/     # Componentes reutilizables (Forms, ProtectedRoute)
├── data/           # Datos estáticos (e.g., departamentos de Colombia)
├── pages/          # Vistas principales (Login, UsersList, PoolList)
├── router/         # Configuración de rutas (AppRouter)
├── services/       # (Opcional) Capa de servicio adicional
├── store/          # Stores de Zustand (authStore, userStore, poolStore)
└── App.jsx         # Componente raíz