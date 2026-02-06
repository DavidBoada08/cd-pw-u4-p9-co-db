import { obtenerTokenFacade } from "../clients/oauth.js";

/**
 * Servicio centralizado de autenticación
 */
export const authService = {
  /**
   * Realiza el login y guarda el token en localStorage
   */
  async login(usuario, password) {
    try {
      // Llamar al cliente OAuth para obtener el token
      const token = await obtenerTokenFacade();
      
      if (token && token.trim() !== "") {
        // Guardar token y flag de autenticación
        localStorage.setItem("token", token);
        localStorage.setItem("EstaAutenticado", "true");
        localStorage.setItem("usuario", usuario);
        return {
          success: true,
          token: token,
          message: "Login exitoso",
        };
      } else {
        return {
          success: false,
          message: "No se pudo obtener el token",
        };
      }
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error al intentar el login",
      };
    }
  },

  /**
   * Realiza logout y limpia localStorage
   */
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("EstaAutenticado");
    localStorage.removeItem("usuario");
  },

  /**
   * Verifica si el usuario está autenticado
   */
  estaAutenticado() {
    return localStorage.getItem("EstaAutenticado") === "true";
  },

  /**
   * Obtiene el token actual
   */
  obtenerToken() {
    return localStorage.getItem("token");
  },

  /**
   * Obtiene el usuario actual
   */
  obtenerUsuario() {
    return localStorage.getItem("usuario");
  },

  /**
   * Obtiene los headers autorizados con el token
   */
  obtenerHeadersAutorizados() {
    const token = this.obtenerToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  },
};
