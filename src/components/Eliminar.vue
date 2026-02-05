<template>
  <section>
    <h3>Borrar Estudiante</h3>

    <input v-model="id" type="number" placeholder="ID a borrar" />

    <button @click="borrar">Borrar</button>

    <div v-if="exito" class="exito-card">

      <h4>Estudiante Eliminado</h4>
      <p>El estudiante con ID <strong>{{ id }}</strong> ha sido eliminado exitosamente.</p>
    </div>

    <div v-if="error" class="error-card">
      <div class="error-icon">✗</div>
      <h4>Error al Eliminar</h4>
      <p>{{ error }}</p>
    </div>
  </section>
</template>

<script>
import { borrarFacade } from "../clients/matricula.js";
import { obtenerTokenFacade } from "../clients/oauth.js";
export default {
  data() {
    return {
      id: null,
      exito: false,
      error: null,
      token: null
    };
  },
  methods: {
    async borrar() {
      this.exito = false;
      this.error = null;

      try {
        await borrarFacade(this.id, this.token);
        this.exito = true;
      } catch (err) {
        this.error = err.response?.data?.message || err.message || "Error al eliminar el estudiante";
      }
    }
  },
  async mounted() {
    this.token = await obtenerTokenFacade();
    console.log("Token obtenido:", this.token);
  }
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
  border-color: #e74c3c;
  box-shadow: 0 0 5px rgba(231, 76, 60, 0.3);
}

button {
  width: 100%;
  background-color: #e74c3c;
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
  background-color: #c0392b;
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

.exito-card {
  background: white;
  border: 2px solid #28a745;
  border-radius: 12px;
  padding: 30px;
  margin-top: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.15);
}


.exito-card h4 {
  color: #28a745;
  margin: 10px 0;
  font-size: 20px;
}


.error-card {
  background: white;
  border: 2px solid #dc3545;
  border-radius: 12px;
  padding: 30px;
  margin-top: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.15);
}


.error-card h4 {
  color: #dc3545;
  margin: 10px 0;
  font-size: 20px;
}

.error-card p {
  color: #666;
  margin: 10px 0 0 0;
  font-size: 15px;
}
</style>