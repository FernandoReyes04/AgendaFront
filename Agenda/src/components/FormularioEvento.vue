<template>
  <div class="modal fade" id="eventoModal" tabindex="-1" aria-labelledby="eventoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventoModalLabel">Agregar Evento</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="guardar">
            <div class="mb-3">
              <label for="descripcion" class="form-label">Descripción:</label>
              <input type="text" id="descripcion" v-model="evento.descripcion" class="form-control" placeholder="Descripción" required>
            </div>
            <div class="mb-3">
              <label for="fechaHora" class="form-label">Fecha y Hora:</label>
              <input type="datetime-local" id="fechaHora" v-model="evento.fechaHora" class="form-control" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
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
      evento: { descripcion: '', fechaHora: '' }
    };
  },
  methods: {
    guardar() {
      this.$emit('guardar', { ...this.evento });
      const modal = Modal.getInstance(document.getElementById('eventoModal'));
      modal.hide();
      this.evento = { descripcion: '', fechaHora: '' };
    },
    showModal() {
      const modal = new Modal(document.getElementById('eventoModal'));
      modal.show();
    }
  },
  mounted() {
    this.showModal();
  }
};
</script>