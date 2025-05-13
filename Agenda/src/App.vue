<template>
  <div id="app">
    <Home />  
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Home from './components/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home
  }
});
</script>

<style>
/* importar fuentes de google para tenerlas disponibles globalmente */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Poppins:wght@500;600;700&family=Roboto:wght@300;400;500&family=Libre+Caslon+Display&display=swap');

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  font-family: var(--app-font-primary, 'Roboto', sans-serif);
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Estilo global para que los h2 tengan la misma fuente que el h1 del título */
h2 {
  font-family: 'Libre Caslon Display', serif !important;
  font-weight: 400 !important;
  letter-spacing: 2px !important;
  text-transform: none !important;
  color: #e0e1dd !important; /* Platinum - color más claro de la paleta para mejor visibilidad */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25) !important;
  font-size: 46px !important; /* Tamaño más grande */
  line-height: 1.2 !important;
}

/* Versión responsiva para pantallas más pequeñas */
@media (max-width: 768px) {
  h2 {
    font-size: 38px !important;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 30px !important;
  }
}
</style>