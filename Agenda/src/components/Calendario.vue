<template>
    <div class="calendar-container">
      <v-calendar is-expanded />
    </div>
  </template>
  
  <script>
  import { setupCalendar } from 'v-calendar';
  import 'v-calendar/style.css';
  
  export default {
    setup() {
      setupCalendar(); // Configura V-Calendar en el componente
    }
  };
  </script>
  
  <style scoped>
  .calendar-container {
    margin-top: 20px; /* Espacio debajo del header */
    width: 90%;
    max-width: 400px; /* Reducimos el tamaño */
    height: 25vh; /* Ocupa un cuarto de la pantalla */
    overflow: hidden; /* Evita que el contenido se expanda demasiado */
  }
  </style>
  