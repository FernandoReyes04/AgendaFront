<template>
    <div class="modal fade show" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Mis Recordatorios</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <ul v-if="recordatorios.length > 0">
              <li v-for="(recordatorio, index) in recordatorios" :key="index">
                {{ recordatorio.name }} - {{ recordatorio.description }} <b>{{ recordatorio.date }}</b>
              </li>
            </ul>
            <p v-else>No tienes recordatorios.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recordatorios: {
        type: Array,
        required: true
      }
    },
    methods: {
      cerrarModal() {
        this.$emit('cerrar');
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>