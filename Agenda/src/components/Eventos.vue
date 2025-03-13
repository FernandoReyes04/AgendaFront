<template>
  <div class="modal fade" id="eventosModal" tabindex="-1" aria-labelledby="eventosModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventosModalLabel">Mis Eventos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" @click.stop="$emit('cerrar')"></button> 
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