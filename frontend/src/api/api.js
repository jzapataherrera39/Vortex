import axios from 'axios';
import authStore from '../store/authStore'; // Ahora sí lo usamos

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    // LEER DESDE ZUSTAND DIRECTAMENTE (Más limpio)
    const token = authStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;