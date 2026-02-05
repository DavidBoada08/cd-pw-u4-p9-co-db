<template>
  <nav></nav>
  <header></header>
  <section>
    <button v-on:click="obtenerTodos()">Consultar Todos</button>

    <label v-if="estudiantes.length > 0">Estudiantes encontrados: {{ estudiantes.length }}</label>
    
    <div class="estudiantes-grid">
      <div v-for="est in estudiantes" :key="est.id" class="estudiante-card">
        <div class="card-header">
          <h4>{{ est.nombre }} {{ est.apellido }}</h4>
          <span class="id-badge">ID: {{ est.id }}</span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="label">Género:</span>
            <span class="value">{{ est.genero }}</span>
          </div>
          <div class="info-row">
            <span class="label">Provincia:</span>
            <span class="value">{{ est.provincia }}</span>
          </div>
          <div class="info-row">
            <span class="label">Fecha Nacimiento:</span>
            <span class="value">{{ formatearFecha(est.fechaNacimiento) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="estudiantes.length === 0 && yaConsulto" class="sin-datos">
      No hay estudiantes para mostrar
    </div>
  </section>
  <footer></footer>
</template>

<script>
import { obtenerEstudiantesFacade } from "../clients/matricula.js";
import { obtenerTokenFacade } from "../clients/oauth.js";

export default {
  data() {
    return {
      estudiantes: [],
      yaConsulto: false,
      token: null,
    };
  },

  methods: {
    async obtenerTodos() {
      if (!this.token) {
        console.error("Token no disponible");
        return;
      }

      const res = await obtenerEstudiantesFacade(this.token);
      this.estudiantes = Array.isArray(res) ? res : [];
      this.yaConsulto = true;
    },
    formatearFecha(fecha) {
      if (!fecha) return '';
      const d = new Date(fecha);
      return d.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  async mounted() {
    this.token = await obtenerTokenFacade();
    console.log("Token obtenido:", this.token);
  },
};
</script>

<style scoped>
section {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

button {
  background-color: #42b983;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

button:hover {
  background-color: #35925f;
}

label {
  display: block;
  font-weight: bold;
  font-size: 18px;
  margin: 20px 0 10px 0;
  color: #2c3e50;
}

pre {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>