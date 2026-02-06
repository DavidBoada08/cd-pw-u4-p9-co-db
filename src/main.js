import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar configuración de axios
import './config/axiosConfig.js'

createApp(App).use(router).mount('#app')

