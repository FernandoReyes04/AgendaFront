<template>
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Añadir Recordatorio</h5>
          <button type="button" class="btn-close" @click="$emit('cerrar')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" id="nombre" v-model="recordatorio.name" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea id="descripcion" v-model="recordatorio.description" class="form-control" required></textarea>
          </div>
          <div class="mb-3">
            <label for="fecha" class="form-label">Fecha</label>
            <input type="date" id="fecha" v-model="recordatorio.date" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" id="email" v-model="recordatorio.email" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="hora" class="form-label">Hora</label>
            <input type="time" id="hora" v-model="recordatorio.hour" class="form-control" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('cerrar')">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="guardarRecordatorio">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { createRecordatorio } from '@/services/recordatorioServices';

export default {
  data() {
    return {
      recordatorio: {
        name: '',
        description: '',
        email: '',
        date: '',
        hour: ''
      }
    };
  },
  methods: {
    async guardarRecordatorio() {
      try {
        await createRecordatorio(this.recordatorio);
        this.$emit('guardar', this.recordatorio);
        this.$emit('cerrar');
      } catch (error) {
        console.error('Error guardando recordatorio:', error);
      }
    }
  }
};
</script>