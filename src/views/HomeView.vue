<template>
  <div class="home">
    <section class="welcome-section">
      <h1>Bienvenido al Sistema de Gestión de Estudiantes</h1>
      <p v-if="usuarioAutenticado" class="user-info">
        Usuario autenticado: <strong>{{ usuarioAutenticado }}</strong>
      </p>
      <div class="dashboard">
        <div class="dashboard-card">
          <h3>📋 Listar Estudiantes</h3>
          <p>Ver todos los estudiantes registrados en el sistema</p>
          <router-link to="/ListarTodos" class="link-btn">Acceder →</router-link>
        </div>
        <div class="dashboard-card">
          <h3>🔍 Buscar por ID</h3>
          <p>Busca un estudiante específico por su ID</p>
          <router-link to="/buscarXid" class="link-btn">Acceder →</router-link>
        </div>
        <div class="dashboard-card">
          <h3>➕ Guardar Estudiante</h3>
          <p>Registra un nuevo estudiante en el sistema</p>
          <router-link to="/guardar" class="link-btn">Acceder →</router-link>
        </div>
        <div class="dashboard-card">
          <h3>✏️ Actualizar Estudiante</h3>
          <p>Actualiza la información completa del estudiante</p>
          <router-link to="/actualizar" class="link-btn">Acceder →</router-link>
        </div>
        <div class="dashboard-card">
          <h3>🔧 Actualizar Parcial</h3>
          <p>Actualiza solo ciertos campos del estudiante</p>
          <router-link to="/actualizarParcial" class="link-btn">Acceder →</router-link>
        </div>
        <div class="dashboard-card">
          <h3>🗑️ Eliminar Estudiante</h3>
          <p>Elimina un estudiante del sistema</p>
          <router-link to="/eliminar" class="link-btn">Acceder →</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { authService } from '@/services/authService.js'

export default {
  name: 'HomeView',
  data() {
    return {
      usuarioAutenticado: ''
    }
  },
  mounted() {
    this.usuarioAutenticado = authService.obtenerUsuario()
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.welcome-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
}

.user-info {
  text-align: center;
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.dashboard-card {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.dashboard-card h3 {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.dashboard-card p {
  color: #666;
  margin: 0 0 15px 0;
  flex-grow: 1;
  font-size: 14px;
}

.link-btn {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 8px 15px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
}

.link-btn:hover {
  background-color: #35925f;
}
</style>
