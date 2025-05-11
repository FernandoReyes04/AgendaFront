import { createApp } from 'vue';
import App from './App.vue';
import VCalendar from 'v-calendar';

// Importación de estilos en orden lógico
import 'bootstrap/dist/css/bootstrap.min.css';
import 'v-calendar/style.css';
import './assets/styles/colors.css'; // Paleta de colores
import './assets/styles/global.css'; // Estilos globales centralizados

// Scripts externos
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

app.use(VCalendar, {}); // Configura v-calendar globalmente

app.mount('#app');