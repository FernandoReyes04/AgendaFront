<template>
  <div class="modal fade" id="contactoModal" tabindex="-1" aria-labelledby="contactoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contactoModalLabel">{{ contacto && contacto.id ? 'Editar' : 'Agregar' }} Contacto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="guardar">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre:</label>
              <input type="text" id="nombre" v-model="contacto.nombre" class="form-control" placeholder="Nombre" required>
            </div>
            <div class="mb-3">
              <label for="correo" class="form-label">Correo:</label>
              <input type="email" id="correo" v-model="contacto.correo" class="form-control" placeholder="Correo" required>
            </div>
            <div class="mb-3">
              <label for="telefono" class="form-label">Teléfono:</label>
              <input type="tel" id="telefono" v-model="contacto.telefono" class="form-control" placeholder="Teléfono" required>
            </div>
            <div class="mb-3">
              <label for="notas" class="form-label">Notas:</label>
              <textarea id="notas" v-model="contacto.notas" class="form-control" placeholder="Notas"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cerrar')">Cancelar</button>
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
  props: {
    contacto: {
      type: Object,
      default: () => ({ nombre: '', correo: '', telefono: '', notas: '' })
    }
  },
  methods: {
    guardar() {
      this.$emit('guardar', this.contacto);
      const modal = Modal.getInstance(document.getElementById('contactoModal'));
      modal.hide();
      this.$emit('cerrar');
    },
    showModal() {
      const modal = new Modal(document.getElementById('contactoModal'));
      modal.show();
    }
  },
  mounted() {
    this.showModal();
  }
};
</script>