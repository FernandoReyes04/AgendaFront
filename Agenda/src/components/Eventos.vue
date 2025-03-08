<template>
  <div class="modal fade" id="eventosModal" tabindex="-1" aria-labelledby="eventosModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventosModalLabel">Mis Eventos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" @click.stop="$emit('cerrar')"></button> 
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="evento in eventos" :key="evento.id">
              {{ evento.nombre }} - {{ evento.fecha }}
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
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      eventos: [
        { id: 1, nombre: 'raulfest', fecha: '2025-10-27T10:00' },
        { id: 2, nombre: 'rifa de negros', fecha: '2025-11-15T18:00' }
      ]
    };
  },
  methods: {
    showModal() {
      const modal = new Modal(document.getElementById('eventosModal'));
      modal.show();
    }
  },
  mounted() {
    this.showModal();
  }
};
</script>