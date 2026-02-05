<template>
  <section>
    <h3>Consultar Estudiante por ID</h3>

    <input v-model="id" type="number" placeholder="ID" />

    <button @click="obtenerPorId">
      Consultar Por Id
    </button>

    <div v-if="estudiante" class="estudiante-card">
      <div class="card-header">
        <h4>{{ estudiante.nombre }} {{ estudiante.apellido }}</h4>
        <span class="id-badge">ID: {{ estudiante.id }}</span>
      </div>
      <div class="card-body">
        <div class="info-row">
          <span class="label">Género:</span>
          <span class="value">{{ estudiante.genero }}</span>
        </div>
        <div class="info-row">
          <span class="label">Provincia:</span>
          <span class="value">{{ estudiante.provincia }}</span>
        </div>
        <div class="info-row">
          <span class="label">Fecha Nacimiento:</span>
          <span class="value">{{ formatearFecha(estudiante.fechaNacimiento) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { obtenerEstudiantePorIdFacade } from "../clients/matricula.js";
import { obtenerTokenFacade } from "../clients/oauth.js";

export default {
  data() {
    return {
      id: null,
      estudiante: null,
      token: null
    };
  },
  methods: {
    async obtenerPorId() {
      const res = await obtenerEstudiantePorIdFacade(this.id, this.token);
      this.estudiante = res;
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
  max-width: 800px;
  margin: 0 auto;
}

h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  margin: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  margin: 8px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #35925f;
}

.estudiante-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  background: linear-gradient(135deg, #42b983 0%, #35925f 100%);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.id-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.card-body {
  padding: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  color: #666;
  font-weight: 600;
  font-size: 14px;
}

.info-row .value {
  color: #2c3e50;
  font-size: 14px;
  text-align: right;
}
</style>