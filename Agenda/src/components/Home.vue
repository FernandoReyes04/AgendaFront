<template>
    <div class="home-container">
      <Header />
      <div class="button-group">
        <button @click="mostrarFormulario">Agregar Contacto +</button>
        <button>Añadir Recordatorio +</button>
        <button>Añadir Evento +</button>
        <button>Mis Contactos</button>
        <button>Mis Recordatorios</button>
        <button>Mis Eventos</button>
      </div>
      <FormularioContacto v-if="mostrarFormulario" />
    </div>
  </template>
  
  <script>
  import Header from './Header.vue'; // Ajusta la ruta si es necesario
  import FormularioContacto from './FormularioContacto.vue';
  
  
  export default {
  components: {
    Header,
    FormularioContacto
  },
  data() {
    return {
      mostrarFormulario: false
    };
  },
  methods: {
    mostrarFormulario() {
      this.mostrarFormulario = true;
    }
  }
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    height: 100vh;
    width: 100%;
    padding-top: 60px; /* Evita que el contenido se superponga al header */
  }
  
  .button-group {
  display: flex;
  justify-content: left; /* Centra los botones horizontalmente */
  flex-wrap: wrap; /* Permite que los botones se acomoden en varias líneas si no hay espacio */
  gap: 10px;
  margin-top: 20px;
}
  
  .button-group button {
    padding: 10px 30px; /* Ajusta el padding para el tamaño del botón */
    border: none;
    border-radius: 10px;
    background-color: #007bff; /* Color de fondo */
    color: white;
    cursor: pointer;
    transition: background 0.3s;
    width: 70%;
  }
  
  /* Estilos adicionales para mejorar la apariencia */
  .button-group button:hover {
    background-color: #0056b3; /* Color de fondo al pasar el mouse */
  }
  </style>
  