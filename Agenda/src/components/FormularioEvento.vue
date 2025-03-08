<template>
  <div class="modal fade" id="eventoModal" tabindex="-1" aria-labelledby="eventoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventoModalLabel">Añadir Evento</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" @click="$emit('cerrar')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" id="nombre" v-model="evento.nombre" class="form-control">
          </div>
          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea id="descripcion" v-model="evento.descripcion" class="form-control"></textarea>
          </div>
          <div class="mb-3">
            <label for="fecha" class="form-label">Fecha</label>
            <input type="datetime-local" id="fecha" v-model="evento.fecha" class="form-control">
          </div>
          <div class="mb-3">
            <label for="hora" class="form-label">Hora</label>
            <input type="time" id="hora" v-model="evento.hora" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cerrar')">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="guardarEvento">Guardar</button>
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
      evento: {
        nombre: '',
        descripcion: '',
        fecha: null,
        hora: null
      }
    };
  },
  methods: {
    guardarEvento() {
      this.$emit('guardar', this.evento);
      const modal = Modal.getInstance(document.getElementById('eventoModal'));
      modal.hide();
      this.$emit('cerrar');
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