import { createApp } from 'vue';
import App from './App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

app.use(VCalendar, {}); // Configura v-calendar globalmente

app.mount('#app');