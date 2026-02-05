<template>
  <section>
    <h3>Guardar Estudiante</h3>

    <input v-model="nombre" placeholder="Nombre" />
    <input v-model="apellido" placeholder="Apellido" />
    <input v-model="fechaNacimiento" type="datetime-local" />
    <input v-model="genero" placeholder="Género" />
    <input v-model="provincia" placeholder="Provincia" />

    <button @click="guardar">Guardar</button>

    <div v-if="resultado" class="resultado-card">
      <div class="card-header">
        <h4>{{ resultado.nombre }} {{ resultado.apellido }}</h4>
        <span class="id-badge">ID: {{ resultado.id }}</span>
      </div>
      <div class="card-body">
        <div class="info-row">
          <span class="label">Género:</span>
          <span class="value">{{ resultado.genero }}</span>
        </div>
        <div class="info-row">
          <span class="label">Provincia:</span>
          <span class="value">{{ resultado.provincia }}</span>
        </div>
        <div class="info-row">
          <span class="label">Fecha Nacimiento:</span>
          <span class="value">{{ formatearFecha(resultado.fechaNacimiento) }}</span>
        </div>
        <div class="exito-msg">✓ Estudiante guardado exitosamente</div>
      </div>
    </div>

    <div v-if="error" class="error-msg">{{ error }}</div>
  </section>
</template>


<script>
import { guardarFacade } from "../clients/matricula.js";
import { obtenerTokenFacade } from "../clients/oauth.js";

export default {
  data() {
    return {
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      genero: "",
      provincia: "",
      resultado: null,
      error: null,
      token: null,
    };
  },
  methods: {
    async guardar() {
      this.error = null;
      this.resultado = null;

      if (!this.nombre || !this.apellido || !this.fechaNacimiento || !this.genero || !this.provincia) {
        this.error = "Completa todos los campos antes de guardar.";
        return;
      }

      const body = {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento + ":00",
        genero: this.genero,
        provincia: this.provincia,
        links: []
      };

      const res = await guardarFacade(body, this.token);
      this.resultado = res;
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
  max-width: 600px;
  margin: 0 auto;
}

h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.3);
}

button {
  width: 100%;
  background-color: #42b983;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #35925f;
}

pre {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.resultado-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
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
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 10px;
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

.exito-msg {
  background: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

.error-msg {
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 6px;
  margin-top: 15px;
  text-align: center;
  font-weight: 600;
}
</style>