import axios from "axios";
import { authService } from "../services/authService.js";

/**
 * Configuración global de Axios con interceptor para agregar token
 */
axios.interceptors.request.use(
  (config) => {
    // Añadir el token a todas las peticiones
    const token = authService.obtenerToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (no autorizado), hacer logout
    if (error.response && error.response.status === 401) {
      console.log("Token expirado, redireccionando al login");
      authService.logout();
      window.location.href = "/#/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
