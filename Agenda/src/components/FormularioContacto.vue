<template>
    <div class="formulario-contacto">
      <h2>Agregar Contacto</h2>
      <form @submit.prevent="guardarContacto">
        <div class="campo">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nombre" required>
        </div>
        <div class="campo">
          <label for="telefono">Número Telefónico:</label>
          <input type="tel" id="telefono" v-model="telefono" required>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nombre: '',
        telefono: ''
      };
    },
    methods: {
      guardarContacto() {
        // Aquí puedes agregar la lógica para guardar el contacto
        // Por ejemplo, puedes emitir un evento para que el componente padre
        // sepa que se ha guardado un nuevo contacto.
        console.log('Nombre:', this.nombre);
        console.log('Teléfono:', this.telefono);
      }
    }
  };
  </script>
  
  <style scoped>
  .formulario-contacto {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .campo {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>