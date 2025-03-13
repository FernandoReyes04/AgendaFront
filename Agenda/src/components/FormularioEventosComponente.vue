<template>
    <div class="formulario-evento">
      <h2>Agregar Evento</h2>
      <form @submit.prevent="guardar">
        <input type="text" v-model="evento.descripcion" placeholder="Descripción" required>
        <input type="datetime-local" v-model="evento.fechaHora" required>
        <button type="submit">Guardar</button>
        <button @click="$emit('cerrar')">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        evento: { descripcion: '', fechaHora: '' }
      };
    },
    methods: {
      guardar() {
        this.$emit('guardar', { ...this.evento });
        this.evento = { descripcion: '', fechaHora: '' }; // Limpiar formulario
      }
    }
  };
  </script>
  
  <style scoped>
  /* ... estilos para el formulario de evento ... */
  .formulario-evento {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px; /* Espacio inferior */
  }
  
  .formulario-evento input,
  .formulario-evento textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box; /* Incluye el padding en el ancho */
    margin-bottom: 10px;
  }
  
  .formulario-evento button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px; /* Espacio superior */
    margin-right: 10px; /* Espacio a la derecha */
  }
  
  .formulario-evento button:hover {
    background-color: #0056b3;
  }
  </style>