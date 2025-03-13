<template>
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventosModalLabel">Mis Eventos</h5>
        </div>
        <div class="modal-body">
          <ul v-if="eventos.length > 0">
            <li v-for="evento in eventos" :key="evento.id">
              {{ evento.name }} - {{ evento.date }}<br>
              {{ evento.description }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cerrar')">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      eventos: {
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