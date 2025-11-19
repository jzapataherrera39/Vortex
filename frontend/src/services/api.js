import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the port if your backend runs on a different one
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also add an interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    // A smarter way to get the token, perhaps from Zustand or localStorage
    const token = localStorage.getItem('userToken'); 
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