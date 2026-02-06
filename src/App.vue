<template>
  <div id="app">
    <nav v-if="estaAutenticado" class="navbar">
      <div class="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/ListarTodos">Listar Todos</router-link> |
        <router-link to="/buscarXid">Buscar Por Id</router-link> |
        <router-link to="/actualizar">Actualizar</router-link> |
        <router-link to="/actualizarParcial">Actualizar Parcial</router-link> |
        <router-link to="/guardar">Guardar</router-link> |
        <router-link to="/eliminar">Eliminar</router-link>
      </div>
      <div class="nav-user">
        <span class="usuario-info" v-if="usuarioActual">
          👤 {{ usuarioActual }}
        </span>
        <button @click="logout" class="logout-btn">Cerrar Sesión</button>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { authService } from "./services/authService.js";

export default {
  name: "App",
  data() {
    return {
      estaAutenticado: false,
      usuarioActual: "",
    };
  },
  methods: {
    logout() {
      authService.logout();
      this.estaAutenticado = false;
      this.usuarioActual = "";
      this.$router.push({ name: "login" });
    },
    verificarAutenticacion() {
      this.estaAutenticado = authService.estaAutenticado();
      this.usuarioActual = authService.obtenerUsuario();
    },
  },
  mounted() {
    this.verificarAutenticacion();
    this.$router.afterEach(() => {
      this.verificarAutenticacion();
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #2c3e50;
  border-bottom: 1px solid #ddd;
}

.nav-links {
  flex: 1;
  display: flex;
  gap: 10px;
  color: white;
}

.nav-links a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 8px 15px;
}

.nav-links a:hover {
  background-color: #1a2332;
}

.nav-links a.router-link-exact-active {
  background-color: #42b983;
  color: white;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 15px;
}

.usuario-info {
  color: white;
  font-weight: bold;
}

.logout-btn {
  padding: 8px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>

