// src/store/authStore.js
import { create } from "zustand";
import { loginRequest } from "../api/authApi";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create((set, get) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated:
    !!(typeof window !== "undefined" && localStorage.getItem("token")),

  // Inicializar usuario desde el token guardado
  initializeUser: () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        set({ user: decoded, token, isAuthenticated: true });
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
  },

  login: async (email, password) => {
    try {
      const res = await loginRequest(email, password);

      if (res?.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", res.token);
        }

        const decoded = jwtDecode(res.token);

        set({
          user: decoded,
          token: res.token,
          isAuthenticated: true,
        });
      }

      return res;
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: err.message || "Login failed" };
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Obtener usuario desde el token actual
  getUserFromToken: () => {
    const token = get().token;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        set({ user: decoded });
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  },
}));

export default useAuthStore;
