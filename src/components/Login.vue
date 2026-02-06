<template>
  <h1>Hola desde el componente Login</h1>
  <nav></nav>
  <section>
    <div class="login">
      <label for="usuario">Usuario</label>
      <input
        id="usuario"
        v-model="usuario"
        type="text"
        placeholder="Usuario"
      />
      <label for="password">Contraseña</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Contraseña"
      />
      <div v-if="error" class="error">{{ error }}</div>
      <button v-on:click="login()" :disabled="cargando">
        {{ cargando ? "Procesando..." : "Entrar" }}
      </button>
    </div>
  </section>
  <footer></footer>
</template>

<script>
import { authService } from "../services/authService.js";

export default {
  data() {
    return {
      usuario: "",
      password: "",
      cargando: false,
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      if (!this.usuario || !this.password) {
        this.error = "Por favor ingrese usuario y contraseña";
        return;
      }

      this.cargando = true;
      try {
        const resultado = await authService.login(this.usuario, this.password);

        if (resultado.success) {
          this.$router.push({ name: "buscarXid" });
        } else {
          this.error = resultado.message;
        }
      } catch (err) {
        console.error("Error en login:", err);
        this.error = "Error al intentar el login";
      } finally {
        this.cargando = false;
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 300px;
  margin: 100px;
  padding: 20px;
  border: 1px solid rgb(143, 118, 118);
  border-radius: 20px;
  text-align: center;
  background: rgb(184, 175, 175);
}

input {
  width: 90%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  width: 50%;
  padding: 8px;
  cursor: pointer;
  border: 1px solid rgb(143, 118, 118);
  border-radius: 20px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffcccc;
  border-radius: 5px;
}
</style>