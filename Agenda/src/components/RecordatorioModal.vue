<template>
  <div class="modal fade" id="recordatorioModal" tabindex="-1" aria-labelledby="recordatorioModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="recordatorioModalLabel">Añadir Recordatorio</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('cerrar')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="nota" class="form-label">Nota</label>
            <input type="text" id="nota" v-model="recordatorio.nota" class="form-control">
          </div>
          <div class="mb-3">
            <label for="url" class="form-label">URL</label>
            <input type="url" id="url" v-model="recordatorio.url" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Fecha</label>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="fechaSwitch" v-model="recordatorio.fechaActivo">
              <label class="form-check-label" for="fechaSwitch">Activar Fecha</label>
            </div>
            <input type="datetime-local" v-if="recordatorio.fechaActivo" v-model="recordatorio.fecha" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Hora</label>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="horaSwitch" v-model="recordatorio.horaActivo">
              <label class="form-check-label" for="horaSwitch">Activar Hora</label>
            </div>
            <input type="time" v-if="recordatorio.horaActivo" v-model="recordatorio.hora" class="form-control">
          </div>
          <div class="mb-3">
            <label for="etiquetas" class="form-label">Etiquetas</label>
            <input type="text" id="etiquetas" v-model="recordatorio.etiquetas" class="form-control">
          </div>
          <div class="mb-3">
            <label for="prioridad" class="form-label">Prioridad</label>
            <select id="prioridad" v-model="recordatorio.prioridad" class="form-select">
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cerrar')">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="guardarRecordatorio">Guardar</button>
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
      recordatorio: {
        nota: '',
        url: '',
        fechaActivo: false,
        fecha: null,
        horaActivo: false,
        hora: null,
        etiquetas: '',
        prioridad: 'baja'
      }
    };
  },
  methods: {
    guardarRecordatorio() {
      // Aquí va la lógica para enviar el recordatorio al backend
      console.log('Recordatorio:', this.recordatorio);
      this.$emit('guardar', this.recordatorio);
      const modal = Modal.getInstance(document.getElementById('recordatorioModal'));
      modal.hide();
      this.$emit('cerrar');
    },
    showModal() {
      const modal = new Modal(document.getElementById('recordatorioModal'));
      modal.show();
    }
  },
  mounted() {
    this.showModal();
  }
};
</script>