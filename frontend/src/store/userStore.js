import { create } from "zustand";

// URL base del backend
const API_URL = "http://localhost:5000/api";

const userStore = create((set, get) => ({
  users: [],
  token: localStorage.getItem("token") || null,

  // Obtener todos los usuarios
  getUsers: async (token = get().token) => {
    if (!token) return [];
    try {
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      set({ users: data });
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  // Crear un usuario
  createUser: async (userData, token = get().token) => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      await get().getUsers();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },

  // Editar usuario
  updateUser: async (id, userData, token = get().token) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      await get().getUsers();
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  },

  // Inactivar / Activar usuario
  toggleUserState: async (id, token = get().token) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}/toggle`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      await get().getUsers();
      return data;
    } catch (error) {
      console.error("Error toggling user state:", error);
      return null;
    }
  },
}));

export default userStore;
