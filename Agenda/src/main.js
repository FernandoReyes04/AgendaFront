import { createApp } from 'vue';
import App from './App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);

app.use(VCalendar, {}); // Configura v-calendar globalmente

app.mount('#app');