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
            <label for="name" class="form-label">Nombre</label>
            <input type="text" id="name" v-model="recordatorio.name" class="form-control">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Descripcion</label>
            <input type="text" id="description" v-model="recordatorio.description" class="form-control">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="recordatorio.email" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Fecha</label>
            <input type="date" v-model="recordatorio.date" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Hora</label>
            <input type="time" v-model="recordatorio.hour" class="form-control">
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
import { createRecordatorio } from '@/services/recordatorioServices'; // ✅ Importar servicio

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
        // ✅ Prepara los datos
        const nuevoRecordatorio = {
          name: this.recordatorio.name,
          description: this.recordatorio.description,
          email: this.recordatorio.email,
          date: this.recordatorio.date,
          hour: this.recordatorio.hour
        };

        // ✅ Guarda en el backend
        const recordatorioGuardado = await createRecordatorio(nuevoRecordatorio);
        console.log('Recordatorio guardado:', recordatorioGuardado);

        // ✅ Notifica al componente padre para actualizar la lista
        this.$emit('guardar', recordatorioGuardado);

        // ✅ Cierra el modal
        const modal = Modal.getInstance(document.getElementById('recordatorioModal'));
        modal.hide();
        this.$emit('cerrar');
      } catch (error) {
        console.error('Error al guardar recordatorio:', error);
      }
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