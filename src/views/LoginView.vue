<template>
  <div class="login-container">
    <h1>Sistema de Autenticación</h1>
    <section class="login-section">
      <div class="login-box">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input
              id="usuario"
              v-model="usuario"
              type="text"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button type="submit" :disabled="cargando">
            {{ cargando ? "Iniciando sesión..." : "Entrar" }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="mensaje" class="success-message">
          {{ mensaje }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { authService } from "../services/authService.js";

export default {
  name: "LoginView",
  data() {
    return {
      usuario: "",
      password: "",
      cargando: false,
      error: "",
      mensaje: "",
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      this.mensaje = "";
      this.cargando = true;

      try {
        // Llamar al servicio de autenticación
        const result = await authService.login(this.usuario, this.password);

        if (result.success) {
          this.mensaje = result.message;
          // Redirigir al home después de 1 segundo
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 1000);
        } else {
          this.error = result.message;
        }
      } catch (err) {
        console.error("Error:", err);
        this.error = "Error inesperado al intentar el login";
      } finally {
        this.cargando = false;
      }
    },
  },
  mounted() {
    // Si ya está autenticado, redirigir al home
    if (authService.estaAutenticado()) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: white;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
}

.login-box h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover:not(:disabled) {
  background-color: #35925f;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success-message {
  margin-top: 10px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
</style>
